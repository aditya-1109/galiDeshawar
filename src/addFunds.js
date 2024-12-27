import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./addFunds.css";

const AddFunds=()=>{

    const nevigate= useNavigate();

    return(
        <>
        
            <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Deposit Coins</h2>
            </div>
        <div className="funds-container">
            <div className="rate"><b>Balance</b></div>
            <div className="balance"><b>0</b></div>
            <form className="deposit-form">
                <input type="number" placeholder="Enter Amount to add" />
                <button type="submit" >Offline Payment Add</button>
            </form>

        </div>
        </>
    )
}

export default AddFunds;