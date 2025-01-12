import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import { FaArrowAltCircleRight } from "react-icons/fa";
import "./admin.css";



const Admin = () => {

  const [data, setData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [showpage, setShowpage] = useState(false);
  const number = localStorage.getItem("code");
  const numberRef = useRef();
  const [alertt, setAlert] = useState("");
  const [user, setUser] = useState(null);
  const walletRef = useRef();
  const [showWallet, setShowWallet] = useState(false);
  const [showBets, setShowBets] = useState(false);
  const [showWalletChange, setshowWalletChange]= useState(false);


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://first-backend-81m3.onrender.com/lotteryData");
      setData(response.data);
    }
    getData();

  }, [])

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.post("https://first-backend-81m3.onrender.com/getUser", { number });
      console.log(response.data.user);
      if (response.data.user.authority === "admin") {
        setShowpage(true);
      }
      else if (response.data.user.authority === "producer") {
        setShowpage(true);
        setshowWalletChange(true);
      }
    }
    getUserData();

  }, [])

  useEffect(() => {
    if (alertt) {
      const timer = setTimeout(() => {
        setAlert(null); // Clear the alert after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [alertt]);

  const handleWallet = async (e) => {
    e.preventDefault();
    const response = await axios.post("https://first-backend-81m3.onrender.com/setWallet", { wallet: walletRef.current.value, number: numberRef.current.value });
    if (response.data.success) {
      alert("Successfully updated")
    } 
  }


  const handleChange = (e, lotteryName, fieldName) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [lotteryName]: {
        ...prevValues[lotteryName],
        [fieldName]: e.target.value,
      },
    }));
  };

  const handleShowUser = async () => {

    const mobileNumber = numberRef.current.value.trim();


    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
      setAlert("Invalid mobile number. Must be 10 digits.");
      return;
    }
    const response = await axios.post("https://first-backend-81m3.onrender.com/getUser", { number: mobileNumber });
    if (response.data.success) {
      setUser(response.data.user);
    }else{
      setAlert("Couldn't find user")
    }

  }

  const handleSubmit = async (e, lotteryName) => {
    e.preventDefault();

    const lotteryData = formValues[lotteryName];
    if (!lotteryData || Object.values(lotteryData).every((value) => !value)) {
      alert("Please fill at least one field before submitting.");
      return;
    }

    console.log(`Submitting data for ${lotteryName}:`, lotteryData);

    const response = await axios.post("https://first-backend-81m3.onrender.com/submitData", { lotteryName, lotteryData });

    if(response.data.success){
      alert(response.data.message)
    }else{
      alert(response.data.message);
    }
    
    setFormValues((prevValues) => ({
      ...prevValues,
      [lotteryName]: {},
    }));
  };


  return (
    <>
      <Navbar />
      {showpage && (
        <div className="admin-container">
          <div className="user-container">
            <p className="user-heading">User Portal</p>
            
            <form className="userNumberForm">
            {alertt && (<div className="alert alert-danger mobile-alert" role="alert">
              {alertt}</div>)}
              <div>
                <input className="user-input" type="Number" ref={numberRef} placeholder="Enter the number..." />
                <FaArrowAltCircleRight size={40} onClick={handleShowUser} />
                </div>
            </form>
              
          </div>


          {user && (
            <div className="userInfo-container">
              <div className="userInfo"><div className="userHeading">Name</div>{user.name}</div>
              <div className="userInfo"><div className="userHeading">Password</div>{user.password}</div>
              <div className="userInfo"><div className="userHeading">Email</div>{user.email}</div>
              <div className="userInfo"><div className="userHeading">Wallet</div>{user.wallet}{showWalletChange && <button className="walletButton" onClick={() => setShowWallet(!showWallet)}>Change</button>}</div>

              {showWallet && (
                <form onSubmit={(e) => handleWallet(e)}>
                  <input className="user-input" style={{ width: "100px" }} type="Number" ref={walletRef} placeholder="Enter Amount.." />
                  <input className="walletButton" type="Submit" />
                </form>
              )}
              <div className="userInfo" onClick={() => setShowBets(!showBets)}><div className="userHeading">Show Bets</div></div>
            </div>
          )}

          {showBets && (<div className="betInfo">{user.bet.map((bets, index) => (
            <div key={index} className="betInfo">
              <div className="userInfo"><div className="userHeading">Bet Name</div>{user.betName}</div>
              <div className="userInfo"><div className="userHeading">Bet Type</div>{bets.betType}</div>
              <div className="userInfo"><div className="userHeading">Amount</div>{bets.amount}</div>
              <div className="userInfo"><div className="userHeading">Digit</div>{bets.digit}</div>
            </div>
          ))}</div>)}




          <div className="lotteryAdminContainer">
            {data?.map((lotteryModel, index) => (
              <div className="lotteryContainer">
                <div className="lottryAdminHeading">
                  <h4>{lotteryModel.lotteryName}</h4>
                  <h5>{lotteryModel.initialTime} - {lotteryModel.finalTime}</h5>
                </div>
                <form className="lottery-form" onSubmit={(e) => handleSubmit(e, lotteryModel.lotteryName)}>
                  <input value={lotteryModel.winnerNumber?.[lotteryModel.winnerNumber.length-1]?.open || ""} onChange={(e) => handleChange(e, lotteryModel.lotteryName, "open",)} type="text" placeholder="open" />
                  <input value={lotteryModel.winnerNumber?.[lotteryModel.winnerNumber.length-1]?.jodi || ""} onChange={(e) => handleChange(e, lotteryModel.lotteryName, "jodi",)} type="text" placeholder="jodi" />
                  <input value={lotteryModel.winnerNumber?.[lotteryModel.winnerNumber.length-1]?.close || ""} onChange={(e) => handleChange(e, lotteryModel.lotteryName, "close",)} type="text" placeholder="close" />
                  <input className="submit" type="submit" value="Submit" />
                </form>
              </div>
            ))}
          </div>

        </div>
      )}
    </>
  )
}

export default Admin;