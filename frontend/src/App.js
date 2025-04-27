import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './Layouts/DashboardLayout'; 
import DashboardHome from './pages/DashboardHome';
import DashboardEvents from './pages/DashboardEvents';
import DashEvent from './pages/DashEvent';
import UserProfile from './pages/UserProfile';
import NewEvent from './pages/NewEvent';
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <RefreshHandler setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="allEvents" element={<DashboardEvents />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="newEvent" element={<NewEvent />} />
          <Route path="allEvents/:eventId" element={<DashEvent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
