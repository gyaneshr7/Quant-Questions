import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Questions from './components/Questions';
import Home from './components/Home';
import Signup from './components/Signup';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import QueDetail from './components/QueDetail';
import ChangePassword from './components/ChangePassword';
import Submissions from './components/Submissions';
import Profile from './components/Profile';
import Progress from './components/Progress';
import ErrorPage from './components/ErrorPage';
import FAQ from './components/FAQ';
import AllQuestions from './components/AllQuestions';
import Forgotpassword from './components/Forgotpassword';
import Resources from './components/Resources';
import Header from './components/Header';

function App() {
  const user = JSON.parse(localStorage.getItem("quantuser"));
  const userRole = user && user.role;

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={userRole==null || userRole=="admin" ?<Login />: <ErrorPage />}></Route>
          <Route path='/signup' element={userRole==null || userRole=="admin" ?<Signup />: <ErrorPage />}></Route>
          <Route path='/forgotpassword' element={user === null ? <Forgotpassword /> : <ErrorPage />}></Route>
          
          <Route path='/quedetail' element={userRole === 'user' || userRole==null ?  <QueDetail /> : <ErrorPage />}></Route>
          <Route path='/questions' element={userRole === 'user' || userRole==null ? <Questions /> : <ErrorPage />}></Route>
          <Route path='/change_password' element={userRole === 'user' ? <ChangePassword /> : <ErrorPage />}></Route>
          <Route path='/submissions' element={userRole === 'user' ? <Submissions /> : <ErrorPage />}></Route>
          <Route path='/profile' element={userRole === 'user' ? <Profile /> : <ErrorPage />}></Route>
          <Route path='/progress' element={userRole === 'user' ? <Progress /> : <ErrorPage />}></Route>
          <Route path='/faq' element={userRole === 'user' ? <FAQ /> : <ErrorPage />}></Route>
          <Route path='/resources' element={userRole === 'user' ? <Resources /> : <ErrorPage />}></Route>

          <Route path='/dashboard' element={userRole === 'admin' ? <Dashboard /> : <ErrorPage />}></Route>
          <Route path='/all-ques' element={userRole === 'admin' ? <AllQuestions /> : <ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
