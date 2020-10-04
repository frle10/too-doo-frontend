import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ToDoGenerator from '../components/ToDoGenerator';
import ToDoList from '../components/ToDoList';
import {
  callChangeName,
  callAddTodo,
  callChangeCompleted,
  callGetTodoList,
} from '../util/apiUtil';
import { emptyList, UNTITLED } from '../util/constants';

interface ParamTypes {
  uuid: string | undefined;
}

const Home = () => {
  const [toDoList, setToDoList] = useState(emptyList);

  const history = useHistory();
  const { uuid } = useParams<ParamTypes>();
  const [urlUuid, setUrlUuid] = useState(uuid);

  useEffect(() => {
    const getTodoList = async () => {
      if (!urlUuid) {
        setToDoList(emptyList);
      } else {
        callGetTodoList(urlUuid).then((tl) => {
          if (tl.data) {
            setToDoList(tl.data);
          } else {
            history.push('/NotFound');
          }
        });
      }
    };

    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeName = async (name: string) => {
    if (name === UNTITLED && !urlUuid) {
      return;
    }

    const uuidArg = urlUuid ? urlUuid : uuidv4();
    if (!urlUuid) {
      setUrlUuid(uuidArg);
    }

    await callChangeName(uuidArg, name).then((tl) => {
      setToDoList(tl.data);
      const input = document.getElementById('toDoListName') as HTMLInputElement;
      input.value = tl.data.name;

      if (!urlUuid) {
        history.push(`/${toDoList.uuid}`);
      }
    });
  };

  const addTodo = async (todo: any) => {
    const uuidArg = urlUuid ? urlUuid : uuidv4();
    if (!urlUuid) {
      setUrlUuid(uuidArg);
    }

    const todoToAdd = await callAddTodo(uuidArg, todo.content);
    setToDoList(
      Object.assign({}, toDoList, {
        todos: [todoToAdd.data, ...toDoList.todos],
      })
    );

    const generator = document.getElementById('generator') as HTMLInputElement;
    generator.value = '';
    history.push(`/${toDoList.uuid}`);
  };

  const changeCompleted = async (id: number) => {
    await callChangeCompleted(id).then((td) => td.data);
    const changedTodos = toDoList.todos;
    changedTodos.forEach((td) =>
      td.id === id ? (td.completed = !td.completed) : {}
    );
    setToDoList(Object.assign({}, toDoList, { todos: changedTodos }));
  };

  const newList = () => {
    const input = document.getElementById('toDoListName') as HTMLInputElement;
    input.value = UNTITLED;
    setToDoList(emptyList);
    setUrlUuid(undefined);
    history.push('/');
  };

  return (
    <>
      <Header name={toDoList.name} changeName={changeName} newList={newList} />
      <ToDoGenerator addTodo={addTodo} />
      <ToDoList todos={toDoList.todos} changeCompleted={changeCompleted} />
      <Footer />
    </>
  );
};

export default Home;
