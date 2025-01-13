import { FaArrowLeft, FaRegHandPointer } from "react-icons/fa";
import "./wallet.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Played=()=>{

    const nevigate= useNavigate();
    const number= localStorage.getItem("code");
    const [user, setUser]= useState("");
    const link= process.env.LINK;

    useEffect(()=>{
        const getData=async()=>{
            console.log(number);
            const response= await axios.post(`${link}/getUser`, {number});
            setUser(response.data.user)
        }
        getData();
    },[])

    return(
        <>
        <div className="wallet-container">
            <div className="backHome">
                <FaArrowLeft onClick={()=>(nevigate("/home"))} size={20} />
                <h2> Played Match</h2>
            </div>

                <table>
                    <thead>
                    <tr>
                        <th>Bet Name</th>
                        <th>Bet Type</th>
                        <th>Amount</th>
                        <th>Digit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user?.bet && user.bet.length > 0 ? (
                     user.bet.map((bids, index) => (
                        <tr key={index}>
                            <td>{bids.betName}</td>
                            <td>{bids.betType}</td>
                            <td>{bids.amount}</td>
                            <td>{bids.digit}</td>
                        </tr>
                    ))): (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            No bets available
                          </td>
                        </tr>
                      )}
                    </tbody>
                </table>
           

        </div>
        </>
    )
}

export default Played;