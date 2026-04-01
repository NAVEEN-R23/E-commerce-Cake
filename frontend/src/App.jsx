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

      <Routes>

        {/* Pages WITH Navbar */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/cakes" element={<><Navbar /><Cakes /></>} />
        <Route path="/desserts" element={<><Navbar /><Desserts /></>} />
        <Route path="/custom" element={<><Navbar /><CustomOrders /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />

        {/* Page WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminHome/>}/>

      </Routes>
    </>
  )
}

export default App
