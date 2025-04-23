import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import DashboardHome from './pages/DashboardHome';
import UserProfile from './pages/UserProfile'
import DashboardEvents from './pages/DashboardEvents';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard/home' element={<DashboardHome />} />
          <Route path='/dashboard/allEvents' element={<DashboardEvents />} />
          <Route path='/dashboard/user/profile' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
