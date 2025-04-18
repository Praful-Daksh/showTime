import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/Dashboard'
import './App.css'
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard/home' element={<DashBoard/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
