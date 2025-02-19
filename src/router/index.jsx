import { createHashRouter, RouterProvider } from "react-router-dom"
import FrontLayout from "../pages/frontpage/FrontLayout"
import Home from "../pages/frontpage/Home"
import Product from '../pages/frontpage/Product'
import Login from '../pages/admin/Login'
import Products from '../pages/admin/Products'
import ProductInfo from "../pages/frontpage/ProductInfo"

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

