import { useForm } from "react-hook-form";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const link = process.env.REACT_APP_LINK;

  const onSubmit = async (data) => {
    setAlert(null);
    try {
      const response = await axios.post(`${link}/registerUser`, data);
      if (response.data.success) {
        navigate("/");
      } else {
        setAlert(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setAlert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <img className="website-logo" src="/images/websiteLogo.png" alt="website-logo" />
      <h1 className="login-dialog">Register Your Account</h1>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {alert && <div className="alert alert-danger mobile-alert">{alert}</div>}
        
        <input
          type="text"
          placeholder="Enter Mobile number"
          {...register("mobileNumber", {
            required: "Mobile number is required.",
            pattern: {
              value: /^\d{10}$/,
              message: "Mobile number must be exactly 10 digits."
            },
          })}
        />
        {errors.mobileNumber && <p className="error">{errors.mobileNumber.message}</p>}

        <input
          type="text"
          placeholder="Enter Name"
          {...register("name", { required: "Name cannot be empty." })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format."
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long."
            },
            pattern: {
              value: /[!@#$%^&*(),.?":{}|<>]/g,
              message: "Password must include a special character."
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit" className="register-button">REGISTER</button>
      </form>
    </div>
  );
};

export default Register;
