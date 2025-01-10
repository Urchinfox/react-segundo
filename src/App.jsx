import './assets/all.scss';
import { Routes,Route } from 'react-router-dom';
import Products from './component/Products';
import Login from './component/Login';


function App() {

  return (
    <>
    <Routes>
      <Route path='/products' element={<Products />}></Route>
      <Route path='/login' element={<Login />} ></Route>
    </Routes>
    </>
  )
}

export default App
