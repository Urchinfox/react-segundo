import { useEffect, useState } from "react"
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../component/Input";
import Loading from "../component/Loading";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [cartItem,setCartItem] = useState([]);
  const [TotalPrice, setTotalPrice] = useState();
  const [isLoading,setIsloading] = useState(false)
  const [cartLoadingState,setCartLoadingState] = useState([]);

    const {
      register,
      handleSubmit,
      formState: {errors},
      reset
    } = useForm({
      defaultValues:{
        email:'xxx@gmail.com'
      },
      mode:'onTouched'
    });


    const onSubmit = async(data) =>{
      if(cartItem.length === 0){
        alert('購物車無商品')
        return;
      }
      const orderData = {
        "data": {
          "user": {
            "name": data.name,
            "email": data.email,
            "tel": data.tel,
            "address": data.address
          },
          "message": data.comments
        }
      }
      setIsloading(true)
      try {
        const res = await axios.post(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/order`,orderData);
        console.log(res,"success order")
        getCartItem();
        reset();
        alert('已建立訂單')
        
      } catch (error) {
        console.log(error)
      }
      finally{
        setIsloading(false)
      }
    }



  const getProduct = async() =>{
    setIsloading(true)
    try {
      const res = await axios.get(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/products`)
      setProducts(res.data.products)
    } catch (error) {
      console.log(error)
    }finally{
      setIsloading(false)
    }
  }

  const getCartItem = async() =>{
    try {
      const res = await axios.get(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart`)
      console.log('getallcartitem',res)
      setCartItem(res.data.data.carts)
      setTotalPrice(res.data.data.final_total)
   
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAllCart = async() =>{
    try {
      const res = await axios.delete(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/carts`);
      getCartItem()
      console.log('deleteallcart',res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCartQty = async(id,qty,cartId) =>{
    if(qty<1){
      alert('數量不可小於1');
      return;
    }
    const data = {
      "data": {
        "product_id": id,
        "qty": qty
      }
    }
    try {
      const res = await axios.put(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart/${cartId}`,data)
      console.log('qtychange',res)
      getCartItem()
    } catch (error) {
      console.log(error)
    }
  }

  const addCart = async(id) =>{
    const data = {
      "data": {
        "product_id": id,
        "qty": 1
      }
    }
    setCartLoadingState((prev)=>{
      return [...prev, id]
    })
    try {
      const res = await axios.post(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart`,data)
      console.log('addcartitem',res)
      getCartItem()

      
    } catch (error) {
      console.log(error)
    }finally{
      setCartLoadingState((prev)=>{
        return prev.filter(cartId=> cartId !== id)
      }) 
    }
  }

  useEffect(()=>{
    getProduct();
    getCartItem();
  },[])


  return (<>
    <div className="container">
      <Loading isLoading={isLoading} />
      <div className="mt-4">
        {/* 產品Modal */}
        {/* 產品Modal */}
        <table className="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(item => {
                return (
                  <tr key={item.id}>
                    <td style={{ width: '200px' }}>
                      <img src={item.imageUrl} style={{ height: '100px', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <del className="h6">{item.origin_price}</del>
                      <div className="h5">{item.price}</div>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="fas fa-spinner fa-pulse"></i>
                          查看更多
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-outline-danger" 
                          onClick={()=>addCart(item.id)}
                          disabled={cartLoadingState.includes(item.id)} 
                          >
                          <i className="fas fa-spinner fa-pulse"></i> 
                          加到購物車
                          {
                            cartLoadingState.includes(item.id) && <span class="spinner-border spinner-border-sm" role="status" ></span> 
                          }
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                )
              })
            }
 
          </tbody>
        </table>
        <div className="text-end">
          <button className="btn btn-outline-danger" type="button" onClick={deleteAllCart}>清空購物車</button>
        </div>
        <table className="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style={{ width: '150px' }}>數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            {
              cartItem.map((item)=>{
                return(
                  <tr key={item.product_id}>
                  <th></th>
                  <th>{item.product.title}</th>
                    <th style={{ width: '150px' }}>
                      <button type="button" className="btn-sm btn border-1 border" onClick={()=>handleCartQty(item.product_id,item.qty-1,item.id)}>-</button>
                      {item.qty}
                      <button className="btn-sm btn border-1 border" type="button" onClick={()=>handleCartQty(item.product_id,item.qty+1,item.id)}>+</button>
                      </th>
                  <th>{Number(item.product.price * item.qty)}</th>
                </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end text-success">折扣價:0</td>
              <td className="text-end text-success"></td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end">總價：{TotalPrice}</td>
              <td className="text-end"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="my-5 row justify-content-center">
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors} 
            id='email'
            label='Email'
            rules={{
              required: {
                value: true,
                message: 'email is required'
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'email format is not correct'
              }
            }} />
          </div>

          <div className="mb-3">
            <Input
              register={register}
              errors={errors} 
              id='name'
              label='收件人姓名'
              rules={{required:{
                value:true,
                message:'name is required'
              }}} />
          </div>

          <div className="mb-3">
            <Input
                register={register}
                errors={errors} 
                id='tel'
                label='收件人電話'
                rules={{
                  required:{
                    value:true, 
                    message: 'phone number is required'
                  },
                  minLength:{
                    value: 8,
                    message: 'Phone number must be at least 8 character'
                  },
                  maxLength:{
                    value:12,
                    message:'Phone number must be at most 12 character'
                  },
                  pattern:{
                    value: /^\d+$/,
                    message:'Phone number must be digital'
                  }
                  }} />
          </div>

          <div className="mb-3">
            <Input
                register={register}
                errors={errors} 
                id='address'
                label='收件人地址'
                rules={{
                  required:{
                    value:true,
                    message:'address is required'
                  }}} />        
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">留言</label>
            <textarea id="message" className="form-control" cols="30" rows="10"{...register('comments')} ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  </>)
}