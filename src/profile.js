import { FaArrowLeft, FaRegHandPointer } from "react-icons/fa";
import "./wallet.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Profile=()=>{

    const nevigate= useNavigate();
    const nameRef= useRef("");
    const emailRef= useRef("");
    const mobileRef= useRef("");
    const newPasswordRef= useRef("");
    const confirmPasswordRef= useRef("");

    const back=()=>{
        nevigate("/home")
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
                <form className="login-form">
                    <input type="text" placeholder="Name" ref={nameRef}/>
                    <input type="Number" placeholder="Number" ref={mobileRef} />
                    <input type="email" placeholder="Email" ref={emailRef} />
                    <button type="submit" className="register-button">Update Profile</button>
                </form>
            </div>

            <div className="manage-profile">
                <h2>Change Password</h2>
                <form className="login-form">
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