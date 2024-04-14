import React from 'react';
import AuthForm from './Pages/AuthForm';
import NavBar from './Components/NavBar/NavBar';
import { Route, BrowserRouter as Router, redirect, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserProfile from './Pages/UserProfile';
import VerifyPasswordChange from './Pages/VerifyPasswordChange';
import ExpenseTrack from './Components/ExpenseList/ExpenseTrack';

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
  
      <NavBar/>

      <Routes>
        {token ? (<Route path='/' element={<HomePage/>}/>) : (<Route path="/auth" element={<AuthForm/>}/>)}
        {token ? (<Route path='/profile' element={<UserProfile/>}/>) : (<Route path="/auth" element={<AuthForm/>}/>)}
        {token ? (<Route path='/trackexpense' element={<ExpenseTrack/>}/>) : (<Route path="/auth" element={<AuthForm/>}/>)} 
       {!token && (<Route path="/auth" element={<AuthForm/>}/>)}
       {!token && (<Route path="/verifyPasswordChange" element={<VerifyPasswordChange/>}/>)} 
        
        </Routes>  
    
    </Router>
  )
}

export default App
