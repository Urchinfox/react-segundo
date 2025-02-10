import { createHashRouter, RouterProvider } from "react-router-dom"
import FrontLayout from "../pages/FrontLayout"
import Home from "../pages/Home"
import Product from "../pages/Product"
import Login from '../component/Login'
import Products from '../component/Products'
import ProductInfo from "../pages/ProductInfo"

const routes = createHashRouter([
    {
      path:'/',
      element: <FrontLayout />,
      children : [
        {
          path:'',
          element: <Home />,
        },
        {
          path:'product',
          element:<Product />
        }
      ]
    },
    {
      path:"product/:id",
      element: <ProductInfo/>
    },
    {
        path:'login',
        element:<Login/>
    },
    {
        path :'Products',
        element:<Products/>,
       
    }
  ])

  const AppRouter = () =>{
    return <RouterProvider router={routes}/>
  }

export default AppRouter;

