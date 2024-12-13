import { FaArrowLeft, FaRegHandPointer } from "react-icons/fa";
import "./wallet.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Played=()=>{

    const nevigate= useNavigate();


    return(
        <>
        <div className="wallet-container">
            <div className="backHome">
                <FaArrowLeft onClick={()=>(nevigate("/home"))} size={20} />
                <h2> Played Match</h2>
            </div>

        </div>
        </>
    )
}

export default Played;