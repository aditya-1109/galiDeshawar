
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./withdrawal.css";

const WithDrawal=()=>{

    const nevigate=useNavigate();
    return(
        <>
            <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Withdrawal Coins</h2>
            </div>

            <div className="withdrawal-container">
                <form className="login-form">
                    <label htmlFor="g-pay">G pay number</label>
                    <input className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Gpay number" />
                    <label htmlFor="phonepay">Phonepe number</label>
                    <input className="phonepay" style={{padding:"10px"}} type="number" placeholder="Enter Phonepe number" />
                    <label htmlFor="account">Account Number</label>
                    <input className="account" style={{padding:"10px"}} type="number" placeholder="Enter Bank Account Number" />
                    <label htmlFor="holderName">Account Holder Name</label>
                    <input className="holderName" style={{padding:"10px"}} type="text" placeholder="Enter Account Holder Name" />
                    <label htmlFor="IFSC">IFSC Code</label>
                    <input className="IFSC" style={{padding:"10px"}} type="String" placeholder="Enter IFSC Code" />
                    <label htmlFor="amountpaid">Amount</label>
                    <input className="amountpaid" style={{padding:"10px"}} type="number" placeholder="Enter Amount" />
                    <label htmlFor="id-detail">ID Details</label>
                    <input className="id-detail" style={{padding:"10px"}} type="number" placeholder="Enter ID Detail" />
                    <button type="submit" className="register-button">Submit</button>
                </form>

            </div>
        </>
    )
}

export default WithDrawal;