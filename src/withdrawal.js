
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./withdrawal.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const WithDrawal=()=>{

    const nevigate=useNavigate();
    const [gpayRef, setgPayRef]= useState("")
    const [phonepayRef, setPhonePayRef]= useState("");
    const [accountRef, setAccountRef]= useState("");
    const accountNameRef= useRef("");
    const iFSCRef= useRef("");
    const amountRef= useRef("");
    const IDRef= useRef("");
    const number= localStorage.getItem("number");
    const [user, setUser]= useState("");

    useEffect(()=>{
        const getData=async()=>{
            const response= await axios.post("http://localhost:4000/getUser", {number});
            setUser(response.data.user)
            console.log(response.data.user)
        }
        getData();
    },[])


    const handlewithDraw=(e)=>{
        e.preventDefault();
        if(amountRef.current.value>user.wallet){
            alert("Your wallet does not have enough Amount")
        }else if(gpayRef && gpayRef.length<10){
            alert("please enter a valid google pay number")
        }else if(phonepayRef && phonepayRef.length<10){
            alert("please enter a valid phone pay number")
        }else{
            openWhatsapp();
        }
    }

    const openWhatsapp = () => {
        const phoneNumber = "9540441958";
        let message;
        if(gpayRef!==""){
            message = `Hey i want to withdraw ${amountRef.current.value} from my wallet which have Rs. ${user.wallet}\n My ID is ${user.number} \n My googlePay number is ${gpayRef}`;
        }
        if(phonepayRef!==""){
            message= `Hey i want to withdraw ${amountRef.current.value} from my wallet which have Rs. ${user.wallet}\n My ID is ${user.number} \n My PhonePay number is ${phonepayRef}`;
        }
        if(accountRef!==""){
            message= `Hey i want to withdraw ${amountRef.current.value} from my wallet which have Rs. ${user.wallet}\n My ID is ${user.number} \n My accountDetail is AccountNumber=${accountRef}, Account Name=${accountNameRef.current.value} IFSC code=${iFSCRef.current.value}`;
        }
       
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      };
    
    return(
        <>
            <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Withdrawal Coins</h2>
            </div>

            <div className="withdrawal-container">
                <form className="login-form" onSubmit={(e)=>handlewithDraw(e)}>
                    <label htmlFor="g-pay">G pay number</label>
                    <input className="g-pay" required={(phonepayRef==="" && accountRef==="")}  onChange={(e)=>setgPayRef(e.target.value)} style={{padding:"10px"}} type="number" placeholder="Enter Gpay number" />
                    <label htmlFor="phonepay">Phonepe number</label>
                    <input className="phonepay" required={(gpayRef==="" && accountRef==="")} onChange={(e)=>setPhonePayRef(e.target.value)} style={{padding:"10px"}} type="number" placeholder="Enter Phonepe number" />
                    <label htmlFor="account">Account Number</label>
                    <input className="account" required={(phonepayRef==="" && gpayRef==="")} onChange={(e)=>setAccountRef(e.target.value)} style={{padding:"10px"}} type="number" placeholder="Enter Bank Account Number" />
                    <label htmlFor="holderName">Account Holder Name</label>
                    <input className="holderName" required={(accountRef!=="")}  ref={accountNameRef} style={{padding:"10px"}} type="text" placeholder="Enter Account Holder Name" />
                    <label htmlFor="IFSC">IFSC Code</label>
                    <input className="IFSC" required={(accountRef!=="")} ref={iFSCRef} style={{padding:"10px"}} type="String" placeholder="Enter IFSC Code" />
                    <label htmlFor="amountpaid">Amount</label>
                    <input className="amountpaid" ref={amountRef} required style={{padding:"10px"}} type="number" placeholder="Enter Amount" />
                    <label htmlFor="id-detail">ID Details</label>
                    <input className="id-detail" ref={IDRef} style={{padding:"10px"}} type="number" placeholder="Enter ID Detail" />
                    <button type="submit" className="register-button">Submit</button>
                </form>

            </div>
        </>
    )
}

export default WithDrawal;