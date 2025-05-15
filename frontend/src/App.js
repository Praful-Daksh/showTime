import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './Layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DashboardEvents from './pages/DashboardEvents';
import DashEvent from './pages/DashEvent';
import UserProfile from './pages/UserProfile';
import NewEvent from './pages/NewEvent';
import PublishTicket from './pages/PublishTicket';
import NotFoundPage from './Components/NotFoundPage'
import Marketing from './pages/Marketing';
import ExploreEvents from './pages/ExploreEvents';
import StatsPage from './pages/StatsPage';
import Checkout from './pages/Checkout';

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
          <Route path="allEvents/:eventId" element={<DashEvent />} />
          <Route path="tickets/publish/:eventId" element={<PublishTicket />} />
          <Route path="Published" element={<Marketing />} />
          <Route path="Published/:eventId" element={<StatsPage />} />
          <Route path="show/checkout/:showId" element={<Checkout />} />
        </Route>
        <Route path='/explore/events' element={<ExploreEvents />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
