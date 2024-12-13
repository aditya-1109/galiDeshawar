import Navbar from "./navbar";
import "./home.css";
import { FaWhatsapp, FaTelegram, FaWallet , FaRegCalendarAlt, FaPlay, FaFastForward, FaForward, FaForumbee, FaFortAwesome, FaFrown} from "react-icons/fa";
import {AiOutlinePlus} from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const Home=()=>{

    const nevigate= useNavigate();

    const openWhatsapp=()=>{
        const phoneNumber = "9540441958"; 
        const message = "Hello, I need some help"; 
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
        window.open(whatsappUrl, "_blank");
    }


        const openTelegramChat = () => {
          const phoneNumber = "9540441958"; 
          const message = "Hello, I need some help"; 
          const telegramUrl = `https://t.me/+${phoneNumber}?text=${encodeURIComponent(message)}`;
      
          // Open the Telegram chat in a new tab
          window.open(telegramUrl, "_blank");
        };

    return(
        <>
        <div className="home-container">
        <Navbar />
        <div className="tagline-container">
            <p className="tagline">Welcome to <b style={{color: "black", backgroundColor: "white", padding: "0 5px"}}>Plus Point</b><br />Vishwas ka dhanda vishwas ke sath</p>
            <img className="tagline-image" src="/images/potImage.png" alt="tagline-image" />

        </div>

        <div className="contact-details">
            <b>Phone pay online add points kare Whatsapp contact 9797999797</b>
        </div>

        <div className="contact-icons">
            <div className="wallet-icon" onClick={()=>nevigate("/addFunds")}> <FaWallet size={30} color="white"/><div className="plus-icon"> <AiOutlinePlus size={10} color="white" /></div></div>
           
            <div className="wallet-icon" onClick={openWhatsapp}> <FaWhatsapp size={30} color="white" className="whatsapp-icon" /></div>
            <div className="wallet-icon" onClick={openTelegramChat}><FaTelegram size={30} color="white" className="telegram-icon"  /></div>
        </div>

        <div className="events-container">
            
            <div className="event-container">
                <div className="calender-icon" onClick={()=>nevigate("/chart")}><FaRegCalendarAlt color="brown" size={40}/></div>
                <div className="number-container">
                    <div className="time"><b>previous time</b></div>
                    <div className="Number"><b>Number</b></div>
                    <div className="time"><b>Upcoming time</b></div>
                </div>
                <div className="name-container">
                    <div className="room-name"><b>Room name</b></div>
                    <div className="status"><b>Status</b></div>
                    <div className="Duration"><b>Duration</b></div>
                </div>
                <div onClick={()=>nevigate("/bid")} className="play-icon"><FaForward size={40} color="white"/></div>
            </div>
        </div>

        </div>
        </>
    )
};

export default Home;