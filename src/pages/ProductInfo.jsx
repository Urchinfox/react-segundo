import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
export default function ProductInfo(){
    const {id} = useParams();

    const [product, setProduct] = useState([]);


    const renderProduct = async() =>{
        try {
            const res = await axios.get(`/v2/api/${import.meta.env.VITE_APP_API_PATH}/products/all`)
            const result = res.data.products.filter(item => item.id === id);
            setProduct(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
      renderProduct()
    },[])

    return(<>

        <div className="container">
            <div>
                <h2>單一產品細節</h2>
                {       
                    product.map(item =>{
                        return(
                            <div className="card mb-3" key={item.id}>
                            <img src={item.imageUrl} className="card-img-top primary-image mt-5" alt="主圖" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {item.title}
                                    <span className="badge bg-primary ms-2">{ }</span>
                                </h5>
                                <p className="card-text">商品描述：{item.description}</p>
                                <p className="card-text">商品內容：{item.content}</p>
                                <div className="d-flex">
                                    <p className="card-text text-secondary"><del>{item.origin_price}</del></p>元 / {item.price}
                                </div>
    
                                <h5 className="mt-3">更多圖片：</h5>
                                <div className="d-flex flex-wrap">
                                    {
                                        Array.isArray(item.imagesUrl) && item.imagesUrl.length > 0 ? (
                                            item.imagesUrl.map((url, index) => (
                                                <img src={url} key={index} className="images" />
                                            ))
                                        ) : (<p className="text-secondary">沒有更多圖片</p>)
    
                                    }
    
                                </div>
                            </div>
                        </div>
                        )
                    })
                  
                }
            </div> 
        </div>

    
    </>)
}