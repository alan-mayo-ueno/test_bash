import React from 'react';
import routes from './router';
import Layout from 'components/layout';

const router = [
  {
    path: `/$APP_TEMPLATE/*`,
    element: <Layout />,
    errorElement: <p>Error</p>,
    children: routes,
  },
];

export default router;
