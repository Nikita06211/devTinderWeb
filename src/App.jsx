import React from 'react';
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Body';
import Profile from './Profile';
import Login from './Login';

function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element = {<Body/>}>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/profile' element = {<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <NavBar/>
      <h1 className='text-3xl font-bold'>Hello World</h1>
    </>
  )
}

export default App