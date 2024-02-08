import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './assets/scss/main.scss'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import Signin from './Pages/auth/Signin';
import Login from './Pages/auth/Login';


function App() {

  library.add(faCartShopping)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
