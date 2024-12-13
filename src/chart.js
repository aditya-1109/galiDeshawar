import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./chart.css";

const Chart=()=>{

    const nevigate= useNavigate();
    return(
        <>

        <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>Transfer Coins</h2>
        </div>

        <div className="chart-container">

        <div className="chart-Heading">Prabhas Group App</div>
        <div className="chart-subheading">Plus Point</div>
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
            <tbody>
            <tr>
                <td>Date</td>
                <td>Open</td>
                <td>Jodi</td>
                <td>Close</td>
            </tr>
            <tr>
                <td>Date</td>
                <td>Open</td>
                <td>Jodi</td>
                <td>Close</td>
            </tr>
            <tr>
                <td>Date</td>
                <td>Open</td>
                <td>Jodi</td>
                <td>Close</td>
            </tr>
            <tr>
                <td>Date</td>
                <td>Open</td>
                <td>Jodi</td>
                <td>Close</td>
            </tr>
            </tbody>
        </table>

        </div>

        </>
    )
}

export default Chart;