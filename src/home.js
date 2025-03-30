import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { FaWhatsapp, FaTelegram, FaWallet, FaRegCalendarAlt, FaForward } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./home.css";



const Home = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const link= process.env.REACT_APP_LINK;
  const dat = new Date;
  const day = dat.getDate();
  const month = dat.getMonth() + 1;
  const date = `${day}/${month}`;
  const apiCalledRef = useRef(new Set()); 
  const apiCalledfinalRef = useRef(new Set()); 


  const calculateRemainingTime = (finalTime) => {
    const currentTime = new Date();
    const [time, period] = finalTime.split(" ");
    const [hours, minutes] = time.split(":").map(Number);


    const finalDateTime = new Date();
    finalDateTime.setHours(
      period === "pm" && hours < 12 ? hours + 12 : period === "am" && hours === 12 ? 0 : hours,
      minutes,
      0,
      0
    );

    const timeDifference = finalDateTime - currentTime;

    if (timeDifference <= 0) {
      return "00:00:00";
    }

    const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);


    return `${String(remainingHours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // Fetch data from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${link}/lotteryData`);

        setData(response.data);

      } catch (error) {
        console.error("Error fetching lottery data:", error);
      }
    };

    getData();

  }, [date]);


  

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        return prevData.map((lottery) => {
          const remainingTime = calculateRemainingTime(lottery.finalTime);
          const initialTimeee = calculateRemainingTime(lottery.initialTime);

          if (initialTimeee === "00:00:00" && !apiCalledRef.current.has(lottery.lotteryName)) {
            apiCalledRef.current.add(lottery.lotteryName); 
            callAPI(lottery.lotteryName, "open"); 
          }

          if (remainingTime === "00:00:00" && !apiCalledfinalRef.current.has(lottery.lotteryName)) {
            apiCalledfinalRef.current.add(lottery.lotteryName); 
            callAPI(lottery.lotteryName, "close"); 
          }

          return { ...lottery, RemainingTime: remainingTime };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const callAPI = async (lotteryId, typee) => {
    try {
      const response = await axios.post(`${link}/setStatus`, {lotteryName: lotteryId, typee})
      console.log("API Response:", "success");
    } catch (error) {
      console.error("API Call Failed:", error);
    }
  };


  const openWhatsapp = () => {
    const phoneNumber = "9718992763";
    const message = "Hello, I need some help";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const openTelegramChat = () => {
    const phoneNumber = "9718992763";
    const message = "Hello, I need some help";
    const telegramUrl = `https://t.me/+${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
  };

  

  return (
    <div className="home-container">
      <Navbar />
      <div className="contactDetails">
        <div className="contact-details">पॉइंट जोड़ें (Whatsapp) 9718992763</div>
      </div>

      <div className="tagline-container">
        <p className="tagline">
          Welcome to <b style={{ color: "black", backgroundColor: "white", padding: "0 5px" }}>Gali Deshawar</b>
          <br />
          Visvaas Ka Khel
        </p>
        <img className="tagline-image" src="/images/potImage.png" alt="tagline-image" />
      </div>

      <div className="contact-icons">
        <div className="wallet-icon" onClick={() => navigate("/addFunds")}>
          <FaWallet size={30} color="rgb(120, 43, 5)" />
          <div className="plus-icon">
            <AiOutlinePlus size={10} color="white" style={{ backgroundColor: "black", borderRadius: "50%" }} />
          </div>
        </div>

        <div className="wallet-icon" onClick={openWhatsapp}>
          <FaWhatsapp size={30} color="darkGreen" className="whatsapp-icon" />
        </div>
        <div className="wallet-icon" onClick={openTelegramChat}>
          <FaTelegram size={30} color="white" className="telegram-icon" />
        </div>
      </div>

      {data?.map((lottery, index) => (
        <div className="events-container" key={index}>
          <div className="event-container">
            <div className="calender-icon" onClick={() => navigate(`/chart/${lottery.lotteryName}`)}>
              <FaRegCalendarAlt color="brown" size={40} />
            </div>

            {lottery?.winningNumber.map((winning, index) => (
              <>
                {winning?.date === date && (
                  <>
                    <div className="number-container">
                      <div className="time"><b>{lottery.initialTime}</b></div>
                      <div className="Number">
                        <b>{winning?.open}-{winning?.jodi}-{winning?.close}</b>
                      </div>
                      <div className="time"><b>{lottery.finalTime}</b></div>
                    </div>
                    <div className="name-container">
                      <div className="room-name"><b>{lottery.lotteryName}</b></div>
                      {winning?.status === "RUNNING" ? <div className="status"><b>{winning?.status}</b></div> : <div className="closestatus"><b>{winning?.status}</b></div>}
                      <div className="Duration"><b>{lottery.RemainingTime}</b></div>
                    </div>
                    <div onClick={winning?.status === "CLOSED" ? ()=>alert("This is closed now!!") : () => navigate(`/bid/${lottery.lotteryName}`)} className="play-icon">
                      <FaForward size={40} color="white" />
                    </div>
                  </>)}
              </>
            ))}

          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
