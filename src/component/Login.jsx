import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({
        "username": "",
        "password": ""
    })

const handleChange = (e) => {
    const{name, value} = e.target;
    setLoginData({
        ...loginData,
        [name]: value
    })
}

    const submit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`/v2/admin/signin`,loginData)
            const {token , expired} = res.data;
            document.cookie = `hexToken=${token}; expires = ${new Date(expired)};`
            navigate('/products')
            console.log(res)
        } catch (error) {
            console.dir(error)
        }
    }

    return(<div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form className="d-flex flex-column gap-3" onSubmit={submit}>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="username" name="username" placeholder="name@example.com" onChange={handleChange} />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleChange} />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary">登入</button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>)
}