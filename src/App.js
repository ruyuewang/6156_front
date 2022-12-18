import './App.css';
import {Route, Routes} from "react-router-dom";
import React from 'react';
import Home from "./components/home/Home";
import Details from "./components/details/Details";
import MyLayout from "./components/layout/MyLayout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";


function App() {
  return (
      <Routes>
        <Route element={<MyLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/details">
            <Route path=":rid" element={<Details/>}/>
          </Route>
          <Route path="/user" element={<Profile/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>

  );
}

export default App;