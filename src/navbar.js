import { FaUser, FaBars, FaWallet, FaHistory, FaGamepad, FaUniversity, FaPhone, FaExchangeAlt, FaRegComment, FaShareAlt, FaSignOutAlt } from 'react-icons/fa';
import "./navbar.css";
import { useEffect, useRef, useState } from 'react';
import {motion, spring} from "framer-motion";
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import axios from 'axios';

const Navbar=()=>{

    const [showMenuBar, setShowMenuBar]= useState(false);
    const nevigate= useNavigate();
    const menuRef = useRef(null);
    const number= localStorage.getItem("number");
    const [user, setUser]= useState("");

    // Function to toggle the menu
    const menuBAr = () => {
        setShowMenuBar(!showMenuBar);
    };

    useEffect(()=>{
        const getData=async()=>{
            const response= await axios.post("https://first-backend-81m3.onrender.com/getUser", {number});
            setUser(response.data.user)
        }
        getData();
    },[])

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenuBar(false);
          }
        };
    
        if (showMenuBar) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [showMenuBar]);

      const logout=()=>{
        localStorage.removeItem("number");
        nevigate("/")
      }
    

    
    return(
        <>
        <div className='navbar-container'>
            <div onClick={menuBAr} className="menuBox">
                <FaBars size={30} className='menu-icon' />
            </div>
            <div className='websiteNameContainer'>
                <img src='./images/logo.png' alt='Logo' className='websiteLogo' />
                <h1 className="websiteName"><b>Gali Deshawar</b></h1>
            </div>
            
            <div onClick={()=>nevigate("/wallet")} className="walletBox">
                <FaWallet color='white' size={30}/>
                <div className='wallet'>{user?.wallet}</div>
            </div>
        </div>
        {showMenuBar && (<motion.div ref={menuRef} className='menuBar-container' initial={{x: "-30vw"}} animate={{x:0}} transition={{type: spring, duration: 2}} >
            <div className='menu-header'>
                <div className='id-container'>
                    <div className='name' style={{color: "white"}}>{user?.name}</div>
                    <div className='number' style={{color: "white"}}>{user?.number}</div>
                </div>
            
                <img className="logo" src="/images/websiteLogo.png" alt="website-logo"/>
                
            </div>

            <div className='notification'>
                <div ><b>App Notification</b></div>
                <Switch className='notification-button' />
            </div>

            <div className='menus'>
                <div onClick={()=>nevigate("/profile")} className='menu'>
                    <div className='menu-logo'><FaUser color='white' scale={30} /></div>
                    <div className='menu-text'> My Profile</div>
                </div>
                <div onClick={()=>nevigate("/wallet")} className='menu'>
                    <div className='menu-logo'><FaWallet color='white' scale={30} /></div>
                    <div className='menu-text'> My Wallet</div>
                </div>
                <div onClick={()=>nevigate("/played")} className='menu'>
                    <div className='menu-logo'><FaHistory color='white' scale={30} /></div>
                    <div className='menu-text'> Game History</div>
                </div>
                <div onClick={()=>nevigate("/GameRate")} className='menu'>
                    <div className='menu-logo'><FaGamepad color='white' scale={30} /></div>
                    <div className='menu-text'> Game Rate</div>
                </div>
                <div onClick={()=>nevigate("/addFunds")} className='menu'>
                    <div className='menu-logo'><FaWallet scale={30} color="white"/><div className="plus-icon"> <AiOutlinePlus size={10} color="white" /></div></div>
                    <div className='menu-text'> Add Points</div>
                </div>
                <div onClick={()=>nevigate("/withdrawal")}  className='menu'>
                    <div className='menu-logo'><FaUniversity color='white' scale={30} /></div>
                    <div className='menu-text'> Withdrawal</div>
                </div>
                <div onClick={()=>nevigate("/transfer")} className='menu'>
                    <div className='menu-logo'><FaExchangeAlt color='white' scale={30} /></div>
                    <div className='menu-text'> Transfer Coins</div>
                </div>
                <div onClick={()=>nevigate("/info")} className='menu'>
                    <div className='menu-logo'><FaRegComment color='white' scale={30} /></div>
                    <div className='menu-text'> How To Play</div>
                </div>
                <div onClick={()=>nevigate("/info")} className='menu'>
                    <div className='menu-logo'><FaPhone color='white' scale={30} /></div>
                    <div className='menu-text'> Contact Us</div>
                </div>
                <div 
                    className='menu' 
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: 'Website',
                                text: 'Check out this amazing website!',
                                url: 'https://yourwebsite.com', // Replace with your website URL
                            }).then(() => {
                                console.log('Thanks for sharing!');
                            }).catch((error) => {
                                console.error('Error sharing:', error);
                            });
                        } else {
                            alert('Sharing not supported on this browser.');
                        }
                    }}
                >
                    <div className='menu-logo'><FaShareAlt color='white' scale={30} /></div>
                    <div> Share Now</div>
                </div>
                <div className='menu'>
                    <div className='menu-logo'><AiFillStar color='white' scale={30} /></div>
                    <div> Rate us</div>
                </div>
                <div onClick={logout} className='menu'>
                    <div className='menu-logo'><FaSignOutAlt color='white' scale={30} /></div>
                    <div> Logout Account</div>
                </div>
            </div>

        </motion.div>)}
        </>
    )
}

export default Navbar;