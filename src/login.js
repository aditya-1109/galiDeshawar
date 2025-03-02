import { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const link = process.env.REACT_APP_LINK;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert, setAlert] = useState(null);

    const login = async (data) => {
        const { mobileNumber, password } = data;
    
        try {
            
    
            const response = await axios.post(`${link}/verifyUser`, {
                number: mobileNumber,
                password,
            });
    
            if (response.data.success) {
                localStorage.setItem("code", response.data.user.bcryptPassword);
                setAlert(""); 
                setTimeout(() => navigate("/home"), 500); 
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
    
    const registerUser = () => {
        navigate("/register");
    };

    const reset = () => {
        const phoneNumber = "9200580590";
        const message = "Hello, I need help with resetting my account.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <>
            <div className="login-container">
                <img className="website-logo" src="/images/fullLogo.png" alt="website-log" />
                <h1 className="login-dialog">Login Your Account</h1>
                <form className="login-form" onSubmit={handleSubmit(login)}>
                    {alert && (<div className="alert alert-danger mobile-alert" role="alert">{alert}</div>)}
                    <input type="text" placeholder="Enter Phone number" {...register("mobileNumber", { required: "Mobile number is required", pattern: { value: /^\d{10}$/, message: "Invalid mobile number. Must be 10 digits." } })} />
                    {errors.mobileNumber && <p className="error-message">{errors.mobileNumber.message}</p>}
                    <input type="password" placeholder="Enter Password" {...register("password", { required: "Password is required" })} />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                    <button type="submit" className="login-button">LOGIN NOW</button>
                    <button type="button" onClick={registerUser} className="register-button">REGISTER NOW</button>
                    <button type="button" onClick={reset} className="reset-button"><b>Reset Account ?</b></button>
                </form>
            </div>
        </>
    );
};

export default Login;
