import './App.css'
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Desserts from './pages/Desserts';
import CustomOrders from './pages/CustomOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/profile/Profile';
import ProductDetail from './pages/ProductDetails';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './pages/Admin/AdminHome';
import AdminProductForm from './pages/Admin/AddProduct';
import AdminProducts from './pages/Admin/AdminProduct';
import AdminLayout from './layouts/AdminLayout';
import CustomOrderDetails from './pages/Admin/AdminCustomOrder';




function App() {


  return (
    <>

   
      <Routes>
        {/* Pages WITH Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/desserts" element={<Desserts />} />
        <Route path="/custom" element={<CustomOrders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
      </Route>
        
        {/* Pages WITHOUT Navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin */}
      <Route element={<AdminLayout/>}>
        {/* <Route path="/admin" element={<AdminHome />} /> */}
        <Route path='/customorder' element={<CustomOrderDetails/>}/>
        <Route path="/addproduct" element={<AdminProductForm/>}/>
        <Route path="/adminproducts" element={<AdminProducts/>}/>
      </Route>


      </Routes>
      
    </>
  )
}

export default App