import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ToDoGenerator } from '../components/ToDoGenerator';
import { ToDoList } from '../components/ToDoList';
import { toDoListExample } from '../assets/to-do-example';

const Home = () => {
  return (
    <>
      <Header toDoListName={toDoListExample.name} />
      <ToDoGenerator />
      <ToDoList toDos={toDoListExample.todos} />
      <Footer />
    </>
  );
};

export default Home;
