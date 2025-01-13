import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./withdrawal.css";
import { useRef, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Transfer=()=>{

    const nevigate=useNavigate();
    const numberRef= useRef();
    const amountRef=useRef();
    const [alertt, setAlert]= useState();
    const myNumber= localStorage.getItem("code");
    const link= process.env.LINK;

    const confirmTransfer=(e)=>{
        e.preventDefault();
        const mobileNumber = numberRef.current.value.trim();
        const amount = amountRef.current.value.trim();
    
        if (!mobileNumber || mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
            setAlert("Invalid mobile number. Must be 10 digits.");
            return;
        }
        if (!amount) {
            setAlert("Amount cannot be empty.");
            return;
        }

        const confirmation=window.confirm(`Are you sure you want to transfer the  to ${amount} rs. to the number ${mobileNumber}`);
        if(confirmation){
            handleTransfer(e, mobileNumber, amount)
        }
    }

    const handleTransfer=async(e, mobileNumber, amount)=>{
        e.preventDefault();
        
    
        try {
            setAlert(null); 
    
            const response = await axios.post(`${link}/transferAmount`, {
                number: mobileNumber,
                amount,
                myNumber
            });
    
            if (response.data.success) {
                setAlert(null);
                alert(response.data.message)
                numberRef.current.value="";
                amountRef.current.value="";
            } else {
                setAlert(response.data.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
    
            if (error.response) {
                setAlert(error.response.data.message || "An error occurred. Please try again.");
            } else {
                setAlert("Unable to connect to the server. Please check your internet connection.");
            }
        }
    }

    return(
        <>
        <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Transfer Coins</h2>
        </div>

        <div className="withdrawal-container">
                <form className="login-form" onSubmit={(e)=>confirmTransfer(e)}>
                {alertt && (<div className="alert alert-danger mobile-alert" role="alert">
                 {alertt}
                 </div>)}
                    <input className="g-pay" ref={numberRef} style={{padding:"10px"}} type="number" placeholder="Enter Mobile number" />
                   
                    <input className="id-detail" ref={amountRef} style={{padding:"10px"}} type="number" placeholder="Enter amount" />
                    <button type="submit" className="register-button">Transfer Coins</button>
                </form>

            </div>

        </>
    )
}

export default Transfer;