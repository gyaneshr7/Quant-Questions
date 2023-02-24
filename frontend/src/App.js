import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Questions from './components/Questions';
import Home from './components/Home';
import Signup from './components/Signup';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import QueDetail from './components/QueDetail';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/questions' element={<Questions/>}></Route>
        <Route path='/quedetail' element={<QueDetail/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
