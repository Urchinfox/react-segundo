import { useEffect, useRef, useState } from "react";
import '../assets/utilities/products.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import ProductModal from "./ProductModal";
import DeleteModal from "./DeleteModal";

export default function Products(){
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState();
    const [products,setProducts] = useState([]);
    const [type, setType] = useState();
    const deleteBtnModal = useRef(null)
    const [pageInfo,setPageInfo] = useState();
    
    const productBtnModal = useRef(null)




    const getProduct = async(page=1) =>{
      try {
        const res = await axios.get(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/products?page=${page}`)
        setProducts(res.data.products)
        setPageInfo(res.data.pagination)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    const deleteProduct = async(id) =>{
      try {
        const res = await axios.delete(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/product/${id}`)
        closeDeleteModal()
        getProduct()
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
            <button type="button" className="btn btn-primary" onClick={checkLoginState}>驗證登入</button>
            <button type="button" className="btn btn-primary" onClick={logout}>登出</button>
            <button type="button" className="btn btn-primary" onClick={()=>openModal('create')}>建立商品</button>

            <ProductModal close={closeModal} productInfo={productDetail} getProduct={getProduct} type={type} />
            <DeleteModal close={closeDeleteModal} handleDelete={deleteProduct} id={productDetail?.id} txt={productDetail?.title}  />

          <div className="row mt-5">
            <div className="col-md-6">
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
                      <td>{item.title}<br /><button className="" 
                          onClick={()=>{
                            setProductDetail(item)
                          }}>查看細節</button></td>
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
            {/* <div className="col-md-6">
              <h2>單一產品細節</h2>
              {productDetail ? (
                <div className="card mb-3">
                  <img src={productDetail.imageUrl} className="card-img-top primary-image" alt="主圖" />
                  <div className="card-body">
                    <h5 className="card-title">
                      {productDetail.title}
                      <span className="badge bg-primary ms-2">{}</span>
                    </h5>
                    <p className="card-text">商品描述：{productDetail.description}</p>
                    <p className="card-text">商品內容：{productDetail.content}</p>
                    <div className="d-flex">
                      <p className="card-text text-secondary"><del>{productDetail.origin_price}</del></p>元 / {productDetail.price}
                    </div>
                  
                    <h5 className="mt-3">更多圖片：</h5>
                    <div className="d-flex flex-wrap">
                    {
                      Array.isArray(productDetail.imagesUrl) && productDetail.imagesUrl.length > 0 ? (
                      productDetail.imagesUrl.map((url, index) => (
                      <img src={url} key={index} className="images" />
                      ))
                     ) : (<p className="text-secondary">沒有更多圖片</p>)
                     
                     }
                     
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-secondary">請選擇一個商品查看</p>
              )}
            </div> */}
          </div>

          <div className="d-flex">

          <nav>
          <ul className="pagination">
            <li className="page-item" onClick={()=>handlePage(pageInfo.current_page - 1)}>
              <a className={`page-link ${!pageInfo?.has_pre ? 'disabled': 'none'}`} >
                上一頁
              </a>
            </li>


            {Array.from({length:pageInfo?.total_pages}).map((_,index)=>{
              return(

                <li className="page-item" onClick={()=>handlePage(index+1)}> 
                <a className={`page-link ${pageInfo.current_page === index+1 ? 'active' : 'none'}`} >
                  {index+1}
                </a>
              </li>

              )
            })}


            <li className="page-item" onClick={()=>handlePage(pageInfo.current_page+1)}>
              <a className={`page-link ${!pageInfo?.has_next? 'disabled':'none'}`}>
                下一頁
              </a>
            </li>
          </ul>
          </nav>
          </div>
        </div>

      </>);
}