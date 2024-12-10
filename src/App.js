import logo from './logo.svg';
import './App.css';
import CustomModal from './component/Modal/Modal';
import { useState } from 'react';
import Pagination from './component/Pagination';
import AddTodoList from './component/todo/todo';
import Resume from './component/Resume';
import ToDoList from './component/todo/todo';

import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import AddProduct from './component/product/AddProduct';

function App() {

  const [openModal,setOpenModal]=useState(false)

  const handleModal=()=>{
    setOpenModal(!openModal)
  }
  const closeModal=()=>{
    setOpenModal(false)
  }

  const data=[
    {
      title:"Modal Content",
      description:"This is a modal content"

    },
    {
      title:"Modal Content 2",
      description:"This is a modal content 2"

    },
  ]

  const list=["item 1","item2","item3","item4","item5"]



  return (
    <div className="App">
      {/* <button onClick={handleModal}>Open Modal</button>

      {
        openModal &&(
          <CustomModal onClose={closeModal} data={data} />
        )
      } */}
      <Router>
        <Routes>
          <Route path="/" element={<AddProduct/>} />
        </Routes>
      </Router>

  

      {/* <Pagination item={list}/> */}

{/* 
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Resume Builder</h1>
      <Resume/> */}
  

      
    
    </div>
  );
}

export default App;
