import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Desserts from './pages/Desserts';
import CustomOrders from './pages/CustomOrders';
import About from './pages/About';
import Contact from './pages/Contact';


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
      </Routes>
    </>
  )
}

export default App
