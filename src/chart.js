import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./chart.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Chart=()=>{

    const nevigate= useNavigate();
    const {lotteryName}= useParams();
    const [data, setData]= useState(null);

    useEffect(()=>{
        const getData=async()=>{
            const lotteryData= await axios.get("https://first-backend-81m3.onrender.com/lotteryData");
            const data=lotteryData.data.find((lottery)=> lottery.lotteryName== lotteryName);
            setData(data.winningNumber)
        }

        getData();
    },[])

    return(
        <>

        <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Transfer Coins</h2>
        </div>

        <div className="chart-container">

        <div className="chart-Heading">Gali Deshawar App</div>
        <div className="chart-subheading">Gali Deshawar</div>
        <div className="roomName-heading">MAHAKAL MORNING CHART</div>
        <table className="chart-table">
            <thead>
                <tr>
                <th>Date</th>
                <th>Open</th>
                <th>Jodi</th>
                <th>Close</th>
                </tr>
                
            </thead>
            {data && 
            <tbody>
                {data.map((dat, index)=>(
                    <tr key={index}>
                    <td>{dat.date}</td>
                    <td>{dat.open}</td>
                    <td>{dat.jodi}</td>
                    <td>{dat.close}</td>
                    </tr>

                ))}
           
        
            </tbody>
            }
        </table>

        </div>

        </>
    )
}

export default Chart;