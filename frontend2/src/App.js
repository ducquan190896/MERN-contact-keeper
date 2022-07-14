import React from 'react';

import { Counter } from './features/counter/Counter';
import Home from './component/home';
import Navbar from './component/navbar';
import Register from './component/register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './component/login';


function App() {
  return (
    <div className='w-full min-h-screen bg-slate-300 flex flex-col'>
    
      <Router>
      <div className='flex flex-col items-center justify-center'>
      <Navbar></Navbar>
        <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>


        </Routes>
        
       
        </div>
        <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  />
      </Router>


    </div>
  );
}

export default App;

