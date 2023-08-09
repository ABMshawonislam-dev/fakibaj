import { useState } from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from './pages/Registration';
import Login from './pages/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
 
   <Route>
       <Route
          path="/"
          element={<Registration/>}
        />
       <Route
          path="/login"
          element={<Login/>}
        />
   </Route>

  )
);


function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
