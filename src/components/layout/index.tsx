import Providers from 'providers';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

export default Layout