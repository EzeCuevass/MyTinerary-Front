import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import './styles/App.css';
import Footer from './components/Footer';
import Main from "./components/Main"
import {Route, Routes} from "react-router-dom"
import Cities from './components/Cities';
import Details from './components/Details';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import Alerts from './components/Alerts';
import  userActions  from "./redux/actions/userActions";
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("token")!== null){
      const token = localStorage.getItem("token")
      dispatch(userActions.verifyToken(token))
    }
  },[dispatch])


  return (
    <div className="App">
      <Alerts />
      <Navbar />
      <Routes>
        <Route path='/index' element={<Main />} />
        <Route path='/index.html' element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/main.html' element={<Main />} />
        <Route path='/' element={<Main />} />
        <Route path='/home' element={<Main />} />
        <Route path='/cities' element={<Cities />} />
        <Route path='/cities/citydetails/:id' element={<Details />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/signout" element={<Main />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
