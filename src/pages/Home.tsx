import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ToDoGenerator } from '../components/ToDoGenerator';
import { ToDoList } from '../components/ToDoList';

const Home = () => {
  return (
    <>
      <Header />
      <ToDoGenerator />
      <ToDoList />
      <Footer />
    </>
  );
};

export default Home;
