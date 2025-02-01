import './assets/all.scss';
import { Routes,Route } from 'react-router-dom';
import Products from './component/Products';
import Login from './component/Login';
import FrontLayout from './pages/FrontLayout';
import Product from './pages/Product';
import Home from './pages/Home';


function App() {

  return (
    <>
    <Routes>
      <Route path='/products' element={<Products />}></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/' element={<FrontLayout/>}>
        <Route path='' element={<Home />}></Route>
        <Route path='/product' element={<Product />}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
