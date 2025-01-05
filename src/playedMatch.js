import { FaArrowLeft, FaRegHandPointer } from "react-icons/fa";
import "./wallet.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Played=()=>{

    const nevigate= useNavigate();
    const number= localStorage.getItem("number");
    const [user, setUser]= useState("");

    useEffect(()=>{
        const getData=async()=>{
            console.log(number);
            const response= await axios.post("hhttps://first-backend-phi.vercel.app/getUser", {number});
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