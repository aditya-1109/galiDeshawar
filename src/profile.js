import { FaArrowLeft, FaRegHandPointer } from "react-icons/fa";
import "./wallet.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const Profile=()=>{

    const nevigate= useNavigate();
    const nameRef= useRef("");
    const emailRef= useRef("");
    const mobileRef= useRef("");
    const newPasswordRef= useRef("");
    const confirmPasswordRef= useRef("");
    const number= localStorage.getItem("code");
    const link= process.env.REACT_APP_LINK;

    const back=()=>{
        nevigate("/home")
    }

    const manageProfile=async(e)=>{
        e.preventDefault();
    
        const mobileNumber = mobileRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const name = nameRef.current.value.trim();
    
        if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
            alert("Mobile number must be exactly 10 digits.");
            return;
        }



      
    
        if ( email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Invalid email format.");
            return;
        }
    
            const response= await axios.post(`${link}/updateUser`, {name, email, mobile: mobileNumber, number, password: null})
            if(response.data.success){
                alert(response.data.message);
                
            }else{
                alert(response.data.message)
            }
    }

    const updatePassword=async(e)=>{
        e.preventDefault();

        if(newPasswordRef.current.value!==confirmPasswordRef.current.value){
            alert("password is not matching")
        }else{

        const password= newPasswordRef.current.value;

        if (!password || password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
            alert("Password must be at least 8 characters long and include a special character.");
            return;
        }
    
        const response= await axios.post(`${link}/updateUser`, {name: null, email: null, mobile: null, number, password})
            if(response.data.success){
                alert(response.data.message);
                localStorage.removeItem("code")
                localStorage.setItem("code", response.data.user.becryptPassword);
            }else{
                alert("couldn't updated")
            }
        }
    }



    return(
        <>
        <div className="wallet-container">
            <div className="backHome">
                <FaArrowLeft onClick={back} size={20} />
                <h2>My Profile</h2>
            </div>

            <div className="login-container">
            <div className="manage-profile">
                <h2>Manage Profile</h2>
                <form className="login-form" onSubmit={(e)=>manageProfile(e)}>
                    <input type="text" placeholder="Name" ref={nameRef}/>
                    <input type="Number" placeholder="Number" ref={mobileRef} />
                    <input type="email" placeholder="Email" ref={emailRef} />
                    <button type="submit" className="register-button">Update Profile</button>
                </form>
            </div>

            <div className="manage-profile">
                <h2>Change Password</h2>
                <form className="login-form" onSubmit={(e)=>updatePassword(e)}>
                    <input type="String" placeholder="New Password" ref={newPasswordRef}/>
                    <input type="String" placeholder="Confirm Password" ref={confirmPasswordRef} />
                    <button type="submit" className="register-button">Update Password</button>
                </form>
            </div>

            </div>
            
           
        </div>
        </>
    )
}

export default Profile;