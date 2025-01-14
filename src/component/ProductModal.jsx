import { useEffect, useState } from "react"
import axios from "axios";

export default function ProductModal({close,getProduct,productInfo,type}){

    const [productData,setProductData] = useState(
        {
            "title": "",
            "category": "",
            "origin_price": 0,
            "price": 0,
            "unit": '',
            "description": "",
            "content": "",
            "is_enabled": 1,
            "imageUrl": "",
            "imagesUrl":[] 
        }
    )

    useEffect(()=>{
        if(type==='edit'){
            setProductData(productInfo)   //read the specific product info 
        }else if(type==='create'){
            setProductData(  {
                "title": "",
                "category": "",
                "origin_price": 0,
                "price": 100,
                "unit": '10',
                "description": "",
                "content": "",
                "is_enabled": 1,
                "imageUrl": "",
                "imagesUrl":[] 
            })
        }
    },[type,productInfo])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(['price','origin_price'].includes(name)){
            setProductData({
                ...productData,
                [name] : Number(value)
            })
            // console.log(typeof productData[name] === 'number') //test if its converted
        }else if('is_enabled' === name){
            setProductData({
                ...productData,
                [name]: +e.target.checked
            })
        }
        else{
            setProductData({
                ...productData,
                [name] : value
            })
        }
    }

    const resetForm = () =>{
        setProductData(
            {
                "title": "",
                "category": "",
                "origin_price": 0,
                "price": 0,
                "unit": 0,
                "description": "",
                "content": "",
                "is_enabled": 1,
                "imageUrl": "", 
                "imagesUrl":[] 
            }
        )
    }

    const submit = async(id) =>{
        let method = 'post';
        let api = `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/product`;

        try {
            const data = {"data": productData}
            if(type==='edit'){
                method = 'put'
                api = `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/product/${id}`
            }
        
            const res = await axios[method](api,data);
            resetForm();
            close();
            getProduct();
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="modal fade" id="productModal" tabIndex="-1" >
        <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
            {type==='edit'? `編輯${productInfo.title}`: '建立商品'}
        </h1>
        <button type="button" className="btn-close" onClick={close} ></button>
      </div>
      <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      value={productData.imageUrl}
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='customFile'>
                    或 上傳圖片
                    <input
                      type='file'
                      id='customFile'
                      className='form-control'
                    />
                  </label>
                </div>
                <img src="" alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      value={productData.title}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                        value={productData.category}
                        onChange={handleChange}

                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      庫存
                      <input
                        type='text'
                        id='unit'
                        name='unit'
                        placeholder='請輸入庫存'
                        className='form-control'
                        onChange={handleChange}
                        value={productData.unit}

                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        onChange={handleChange}
                        value={productData.origin_price}

                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        onChange={handleChange}
                        value={productData.price}

                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handleChange}
                      value={productData.description}

                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      onChange={handleChange}
                      value={productData.content}

                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        className='form-check-input'
                        onChange={handleChange}
                        value={productData.is_enabled}
                        checked={!!productData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={close}>關閉</button>
        <button type="button" className="btn btn-primary" onClick={()=>submit(productData.id)}>儲存</button>
      </div>
    </div>
  </div>
    </div>
    )
}