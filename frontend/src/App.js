import './App.css';
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
        <Route path='/change_password' element={<ChangePassword/>}></Route>
        <Route path='/submissions' element={<Submissions/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/progress' element={<Progress/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
