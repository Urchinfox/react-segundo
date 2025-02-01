import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";


export default function FrontLayout(){
    return (
        <>
        <Navbar />

        <Outlet></Outlet>

        <footer className="bg-dark py-3">
            <div className="container">
                <div className="text-light">this is footer</div>

            </div>
        </footer>

        </>
    )
}