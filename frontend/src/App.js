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
import ErrorPage from './components/ErrorPage';

function App() {
  const user = JSON.parse(localStorage.getItem("quantuser"));
  const userRole = user && user.role;

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/questions' element={<Questions />}></Route>
          <Route path='/quedetail' element={<QueDetail />}></Route>
          
          <Route path='/change_password' element={userRole === 'user' ? <ChangePassword /> : <ErrorPage />}></Route>
          <Route path='/submissions' element={userRole === 'user' ? <Submissions /> : <ErrorPage />}></Route>
          <Route path='/profile' element={userRole === 'user' ? <Profile /> : <ErrorPage />}></Route>
          <Route path='/progress' element={userRole === 'user' ? <Progress /> : <ErrorPage />}></Route>

          <Route path='/dashboard' element={userRole == 'admin' ? <Dashboard /> : <ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
