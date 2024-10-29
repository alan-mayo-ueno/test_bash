import React from 'react';

const routes = [
  {    
    index: true,
    lazy: async () => ({
      Component: (await import('pages/index')).default,
    }),
    errorElement: <p>Servicio No Disponible</p>,
    handle: {
      title: 'Home',
      to: '/',
      permissions: ['scoring_risk']      
    }
  },
  {
    path: `list`,
    lazy: async () => ({
      Component: (await import('pages/list')).default,
    }),
    errorElement: <p>Servicio No Disponible</p>,
    handle: {
      title: 'Home',
      to: '/',
      permissions: ['scoring_risk']      
    }
  },
  {
    path: `list/:id`,
    lazy: async () => ({
      Component: (await import('pages/detail')).default,
    }),
    errorElement: <p>Servicio No Disponible</p>,
    handle: {
      title: 'Home',
      to: '/',
      permissions: ['scoring_risk']      
    }
  },
];

export default routes;
