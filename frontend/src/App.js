import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Questions from './components/Questions';
import Home from './components/Home';
import Signup from './components/Signup';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/questions' element={<Questions/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
