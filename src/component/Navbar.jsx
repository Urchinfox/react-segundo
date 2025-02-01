import { Link } from "react-router-dom"
export default function Navbar(){
    return(<>
        <header>
            <nav className="bg-dark py-3">
                <ul className="d-flex">
                    <li className="me-3"><Link to='/' className="text-white">Home</Link></li>
                    <li ><Link to='/product' className="text-white">Product</Link></li>
                </ul>
            </nav>
        </header>
    
    </>)
}