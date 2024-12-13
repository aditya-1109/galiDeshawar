import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./withdrawal.css";

const Transfer=()=>{

    const nevigate=useNavigate();

    return(
        <>
        <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Transfer Coins</h2>
        </div>

        <div className="withdrawal-container">
                <form className="login-form">
                    
                    <input className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Mobile number" />
                   
                    <input className="id-detail" style={{padding:"10px"}} type="number" placeholder="Enter amount" />
                    <button type="submit" className="withdrawal-button">Transfer Coins</button>
                </form>

            </div>

        </>
    )
}

export default Transfer;