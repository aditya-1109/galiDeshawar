import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./addFunds.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const AddFunds=()=>{

    const nevigate= useNavigate();
    const number= localStorage.getItem("number");
    const inputRef= useRef();
    const [user, setUser]= useState("");

    useEffect(()=>{
        const getData=async()=>{
            console.log(number);
            const response= await axios.post("https://first-backend-phi.vercel.app/getUser", {number});
            setUser(response.data.user)
            console.log(response.data.user)
        }
        getData();
    },[])


    const openWhatsapp = () => {
        const phoneNumber = "9540441958";
        const message = `For Gali Deshawar group Deposit request.\n Your id=${number} UPI ID= G pay=${9540441958}\n Amount= ${inputRef.current.value}\n Please share screenshot of payment\n scan here https://photos.app.goo.gl/7j2AEMCcW5vrCKp78`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        inputRef.current.value="";
      };
    

    return(
        <>
        
            <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Deposit Coins</h2>
            </div>
        <div className="funds-container">
            <div className="rate"><b>Balance</b></div>
            <div className="balance"><b>{user?.wallet}</b></div>
            <form className="deposit-form">
                <input type="number" ref={inputRef} placeholder="Enter Amount to add" />
                <button type="submit" onClick={openWhatsapp}>Offline Payment Add</button>
            </form>

        </div>
        </>
    )
}

export default AddFunds;