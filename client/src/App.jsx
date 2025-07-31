import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import React from 'react';
import { Home, Login } from './pages';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;