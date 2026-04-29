import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import VoiceInput from '../pages/VoiceInput';







const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <VoiceInput />
      <Footer />


    </>
  )
}

export default MainLayout
