import { useRef, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register=()=>{

    let mobileRef=useRef("");
    let nameRef= useRef("");
    let emailRef= useRef("");
    let passwordRef= useRef("");
    const nevigate= useNavigate();
    const [alert, setAlert]= useState(null);
   

    const Register = async (e) => {
        e.preventDefault();
    
        const mobileNumber = mobileRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const name = nameRef.current.value.trim();
    
        // Validate inputs
        if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
            setAlert("Mobile number must be exactly 10 digits.");
            return;
        }

        if (!name) {
            setAlert("Name cannot be empty.");
            return;
        }
    
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setAlert("Invalid email format.");
            return;
        }
    
        if (!password || password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
            setAlert("Password must be at least 8 characters long and include a special character.");
            return;
        }
    
    
        setAlert(null);
    
        try {
    
            const registerUser = await axios.post("http://localhost:4000/registerUser", {
                mobileNumber,
                password,
                email,
                name,
            });
    
            if (registerUser.data.success) {
                nevigate("/");
            } else {
                setAlert(registerUser.data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setAlert("An error occurred during registration. Please try again later.");
        }
    };
    


    return(
        <>
        <div className="login-container">
        <img className="website-logo" src="/images/websiteLogo.png" alt="website-logo"/>
        <h1 className="login-dialog">Register Your Account</h1>
        
        <form className="login-form" onSubmit={Register}>
        {alert && (<div className="alert alert-danger mobile-alert" role="alert">
                 {alert}
            </div>)}
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