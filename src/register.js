import { useRef, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Register=()=>{

    let mobileRef=useRef("");
    let nameRef= useRef("");
    let emailRef= useRef("");
    let passwordRef= useRef("");
    const nevigate= useNavigate();
    const [alert, setAlert]= useState(null);

    const Register=(e)=>{
        e.preventDefault();
        const mobileNumber= mobileRef.current.value;
        const password= passwordRef.current.value;
        if(mobileNumber.length!=10 || mobileNumber.length==0){
            setAlert("Number is incorrect");
        }else{
            setAlert(null);
            nevigate("/home")
        }


    }


    return(
        <>
        <div className="login-container">
        <img className="website-logo" src="/images/websiteLogo.png" alt="website-logo"/>
        <h1 className="login-dialog">Register Your Account</h1>
        {alert && (<div className="alert alert-danger mobile-alert" role="alert">
                 {alert}
            </div>)}
        <form className="login-form" onSubmit={Register}>
            <input type="Number" placeholder="Enter Mobile number" ref={mobileRef} />
            <input type="text" placeholder="Enter Name" ref={nameRef} />
            <input type="email" placeholder="Enter Email" ref={emailRef} />
            <input type="String" placeholder="Enter Password" ref={passwordRef} />
            <button type="submit" className="register-button">REGISTER</button>
        </form>
        
        </div>
        </>
    )
}

export default Register;