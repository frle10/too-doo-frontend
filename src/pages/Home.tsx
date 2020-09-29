import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToDoGenerator } from '../components/ToDoGenerator';
import { ToDoList } from '../components/ToDoList';
import { toDoListExample } from '../assets/to-do-example';

interface ParamTypes {
  uuid: string | undefined;
}

const Home = () => {
  const [toDoList, setToDoList] = useState(toDoListExample);

  const { uuid } = useParams<ParamTypes>();
  const [urlUuid, setUrlUuid] = useState(uuid);

  if (!urlUuid) {
    setUrlUuid(uuidv4());
    console.log(urlUuid);
  }

  const changeName = (name: string) =>
    setToDoList({ ...toDoList, name: name ? name : 'untitled' });

  const addToDo = (toDo: any) => {
    setToDoList(
      Object.assign({}, toDoList, { todos: [toDo, ...toDoList.todos] })
    );
  };

  const changeCompleted = (index: number) => {
    const changedTodos = toDoList.todos;
    changedTodos[index].completed = !changedTodos[index].completed;
    setToDoList(Object.assign({}, toDoList, { todos: changedTodos }));
  };

  const newList = () =>
    setToDoList(Object.assign({}, { name: 'untitled', todos: [] }));

  return (
    <>
      <Header name={toDoList.name} changeName={changeName} newList={newList} />
      <ToDoGenerator addToDo={addToDo} />
      <ToDoList todos={toDoList.todos} changeCompleted={changeCompleted} />
      <Footer />
    </>
  );
};

export default Home;
