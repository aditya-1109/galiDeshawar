import { useRef, useState } from "react";
import "./login.css";
import {useNavigate} from "react-router-dom";

const Login=()=>{

    const nevigate= useNavigate();

    let mobileRef=useRef("");
    let passwordRef= useRef("");
    const [alert, setAlert]= useState(null);

    const login=(e)=>{
        e.preventDefault();
        const mobileNumber= mobileRef.current.value;
        const password= passwordRef.current.value;
        if(mobileNumber.length!=10){
            setAlert("Number is incorrect");
        }else{
            setAlert(null);
            nevigate("/home")
        }

        
    }

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
        {alert && (<div className="alert alert-danger mobile-alert" role="alert">
                 {alert}
            </div>)}
        <form className="login-form" onSubmit={login}>
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