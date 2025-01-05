import { useRef, useState } from "react";
import "./login.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login=()=>{

    const nevigate= useNavigate();

    let mobileRef=useRef("");
    let passwordRef= useRef("");
    const [alert, setAlert]= useState(null);

    const login = async (e) => {
        e.preventDefault();
    
        const mobileNumber = mobileRef.current.value.trim();
        const password = passwordRef.current.value.trim();
    
        if (!mobileNumber || mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
            setAlert("Invalid mobile number. Must be 10 digits.");
            return;
        }
        if (!password) {
            setAlert("Password cannot be empty.");
            return;
        }
    
        try {
            setAlert(null); 
    
            const response = await axios.post("https://first-backend-201m.onrender.com/verifyUser", {
                number: mobileNumber,
                password,
            });
    
            if (response.data.success) {
                setAlert(null);
                localStorage.setItem("number",mobileNumber);
                nevigate("/home");
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
    };
    
    const register=()=>{
        nevigate("/register");
    }

    const reset=()=>{
            const phoneNumber = "9540441958"; 
            const message = "Hello, I need help with resetting my account."; 
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
            window.open(whatsappUrl, "_blank");
          
    }


    return(
        <>
        <div className="login-container">
        <img className="website-logo" src="/images/fullLogo.png" alt="website-logo"/>
        <h1 className="login-dialog">Login Your Account</h1>
        
        <form className="login-form" onSubmit={login}>
        {alert && (<div className="alert alert-danger mobile-alert" role="alert">
                 {alert}
            </div>)}
            <input type="Number" placeholder="Enter Mobile number" ref={mobileRef} />
            <input type="String" placeholder="Enter Password" ref={passwordRef} />
            <button type="submit" className="login-button">LOGIN NOW</button>
            <button onClick={register} className="register-button">REGISTER NOW</button>
            <button onClick={reset} className="reset-button"><b>Reset Account ?</b></button>
        </form>
        
        
        
        </div>
        </>
    )
}

export default Login;