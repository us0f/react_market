import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/GeneralComponents/ScrollToTop';

const Layout = () => {
  return (
    <div className="App flex flex-col w-full h-screen">
        <ScrollToTop />
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout;