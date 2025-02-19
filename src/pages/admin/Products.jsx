import { useEffect, useRef, useState } from "react";
import '../../assets/utilities/products.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import ProductModal from '../../component/ProductModal'
import DeleteModal from "../../component/DeleteModal";
import Pagination from "../../component/Pagination";
import Message from "../../component/messageToast";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slices/messageSlice";

export default function Products(){
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState();
    const [products,setProducts] = useState([]);
    const [type, setType] = useState();
    const deleteBtnModal = useRef(null)
    const [pageInfo,setPageInfo] = useState();
    const productBtnModal = useRef(null)
    const dispatch = useDispatch();




    const getProduct = async(page=1) =>{
      try {
        const res = await axios.get(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/products?page=${page}`)
        setProducts(res.data.products)
        setPageInfo(res.data.pagination)
      } catch (error) {
        console.log(error)
      }
    }

    const deleteProduct = async(id) =>{
      try {
        const res = await axios.delete(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/product/${id}`)
        closeDeleteModal()
        getProduct()
        dispatch(createAsyncMessage(res.data))
        
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      productBtnModal.current = new Modal('#productModal',{backdrop:'static'});
      deleteBtnModal.current = new Modal('#deleteModal',{backdrop:'static'});
      getProduct();
    },[])

    const openModal = (type,data) =>{
      if(type ==='edit'){
        setType(type);
        setProductDetail(data)
      }else if(type==='create'){
        setType(type)
      }
      productBtnModal.current.show();
    }

    const openDeleteModal = (data)=>{
      deleteBtnModal.current.show();
      setProductDetail(data)
    }
    const closeDeleteModal = () =>{
      deleteBtnModal.current.hide();
    }

    const closeModal = () => {
      productBtnModal.current.hide();
    }

    const handlePage = (page) =>{
      getProduct(page)
    }





    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      axios.defaults.headers.common['Authorization'] = token;

    const checkLoginState = async() =>{
        try {
            await axios.post(`/v2/api/user/check`);
            alert('登入中');
        } catch (error) {
            console.log(error)
            alert('登入失敗')
        }
    }


    useEffect(()=>{
        if(!token){
            return navigate('/login');
        }
        (async()=>{
            try {
                await axios.post(`/v2/api/user/check`);
            } catch (error) {
                if(!error.response.data.success){
                    navigate('/login')
                }
                console.log(error)
            }
        })()

    },[token])

    const logout = async() => {
        const path = window.location.pathname.includes('/react-segundo/') 
        ? '/react-segundo/' : '/';

        document.cookie = `hexToken=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        navigate('/login')
    }

 

       return (<>

        <div className="container">
          <Message />
            <button type="button" className="btn btn-primary" onClick={checkLoginState}>驗證登入</button>
            <button type="button" className="btn btn-primary" onClick={logout}>登出</button>
            <button type="button" className="btn btn-primary" onClick={()=>openModal('create')}>建立商品</button>

            <ProductModal close={closeModal} productInfo={productDetail} getProduct={getProduct} type={type} />
            <DeleteModal close={closeDeleteModal} handleDelete={deleteProduct} id={productDetail?.id} txt={productDetail?.title}  />

          <div className="row mt-5">
            <div className="col-12">
              <h2>產品列表</h2>
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th>編輯/刪除</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}<br /></td>
                      <td>{item.origin_price}</td>
                      <td>{item.price}</td>
                      <td>
                        {!!item.is_enabled ? 'true' : 'false' }
                      </td>
                      <td>
                          <button type="button" className="btn-sm btn btn-primary me-1" onClick={()=>openModal('edit',item)}>編輯</button>
                          <button type="button" className="btn-sm btn btn-danger" onClick={()=>openDeleteModal(item)}>刪除</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
          <Pagination pageInfo={pageInfo} handlePage={handlePage} />
        </div>

      </>);
}