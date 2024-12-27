import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./placebid.css";

const PlaceBid=()=>{

    const nevigate= useNavigate();
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' }); // "mon" in short format
    const year = today.getFullYear();
    const formattedDate = `${month}, ${day < 10 ? '0' : ''}${day} ${year}`;

    return(
        <>
         <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>NAME</h2>
        </div>

        <div className="place-bid-header">
            <div className="date"> {formattedDate}</div>
            <div className="open-close">
                <div className="open-button">OPEN</div>
                <div className="close-button">CLOSE</div>
            </div>
        </div>

        
        <div className="placebid-container">
                <form className="login-form">
                    <label htmlFor="g-pay"><b>Bid Digits</b></label>
                    <input className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Digit" />
                    <label htmlFor="phonepay"><b>Bid Points</b></label>
                    <input className="phonepay" style={{padding:"10px"}} type="number" placeholder="Enter Amount" />
                    <button type="submit" className="register-button">ADD BID</button>
                </form>
                <button className="bid-submit-button">Submit</button>
            </div>

            

        </>
    )
}

export default PlaceBid;