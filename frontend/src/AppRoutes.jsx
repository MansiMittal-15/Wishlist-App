import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Wishlist from './components/Wishlist';
import WishlistDetail from './components/WishlistDetail';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout><Home/></Layout>}/>
        <Route path='/wishlist' element={<Layout><Wishlist/></Layout>}/>
        <Route path='/wishlist/:id' element={<Layout><WishlistDetail/></Layout>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
    </Routes>
    </BrowserRouter>    
    </>
  )
}

export default AppRoutes