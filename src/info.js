import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./withdrawal.css";

const Info=()=>{

    const nevigate= useNavigate();
    return(
        <>
            <div className="backHome">
                    <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                    <h2>How To Play</h2>
            </div>

            <div className="withdrawal-container">
            <p>Welcome to Plus point Matka application. Now minimum bid Rs.5, 100% genuine... application and instant withdraw, add money,bindass play and earn a lot of money. Any problem feel free to whatsapp 24*7 available our support team. </p>
            </div>
        </>
    )
}

export default Info;