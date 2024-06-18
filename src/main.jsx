import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Layout, ProductDetails, Success} from './Components'
import { StateContext } from './context/stateContext.jsx'
import { Toaster } from 'react-hot-toast'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/product/:slug',
        element: <ProductDetails />,
      },
      {
        path: '/success',
        element: <Success />,
      }
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateContext>
      <Toaster />
    <RouterProvider router={router}/>
    </StateContext>
  </React.StrictMode>,
)
