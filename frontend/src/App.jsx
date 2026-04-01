import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Desserts from './pages/Desserts';
import CustomOrders from './pages/CustomOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './pages/Admin/AdminHome';


function App() {


  return (
    <>

    <Navbar/>
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/cakes" element={<Cakes/>} />
        <Route path="/Desserts" element={<Desserts/>} />
        <Route path="/custom" element={<CustomOrders/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />

{/* Page WITHOUT Navbar */}
<Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<AdminHome/>}/>


      </Routes>
    </>
  )
}

export default App
