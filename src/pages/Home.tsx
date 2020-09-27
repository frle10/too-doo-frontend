import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToDoGenerator } from '../components/ToDoGenerator';
import { ToDoList } from '../components/ToDoList';
import { toDoListExample } from '../assets/to-do-example';

const Home = () => {
  const [toDoList, setToDoList] = useState(toDoListExample);

  const changeName = (name: string) =>
    setToDoList(
      Object.assign({}, toDoList, { name: name ? name : 'untitled' })
    );

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
      <Header
        toDoListName={toDoList.name}
        changeName={changeName}
        newList={newList}
      />
      <ToDoGenerator addToDo={addToDo} />
      <ToDoList toDos={toDoList.todos} changeCompleted={changeCompleted} />
      <Footer />
    </>
  );
};

export default Home;
