import { FaDice,  FaDiceSix, FaDiceThree, FaGamepad, FaGem, FaIdCard, FaPlay } from "react-icons/fa";
import "./bid.css";
import { useNavigate, useParams } from "react-router-dom";

const Bid=()=>{

    const nevigate= useNavigate();

    const {lotteryName}= useParams();

    return(
        <>
        <div className="digit-bid">
            <div className="bid-heading"><b>DIGIT BID</b> <FaPlay className="playbid-icon" /></div>
            <div className="bid-icon-container">
                

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/singledigit`)} className="All-in-one">
                    <FaDiceThree className="gamepad-icon" />
                    <p>SINGLE DIGIT</p>
                </div>

                

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/jodidigit`)} className="All-in-one">
                    <FaDice className="gamepad-icon" />
                    <p>JODI DIGIT</p>
                </div>

                
            </div>

        </div>



        <div className="digit-bid">
            <div className="bid-heading"><b>PANNA BID</b> <FaPlay className="playbid-icon" /></div>
            <div className="bid-icon-container">
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/singlepanna`)} className="All-in-one">
                    <p className="spade-icon">&#9824;</p>
                    <p>SINGLE PANA</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/doublepanna`)} className="All-in-one">
                    <p className="spade-icon"><p>&#9824;</p><p style={{marginLeft: "-20px"}}>&#9824;</p></p>
                    <p>DOUBLE PANA</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/triplepanna`)} className="All-in-one">
                <p className="spade-icon"><p>&#9824;</p><p style={{marginLeft: "-20px", marginTop: "-30px"}}>&#9824;</p><p style={{marginLeft: "-20px"}}>&#9824;</p></p>
                    <p>TRIPLE PANA</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/allpanna`)} className="All-in-one">
                    <FaGem className="gamepad-icon" />
                    <p>All PANA</p>
                </div>
            </div>

        </div>

        <div className="digit-bid">
            <div className="bid-heading"><b>BID OF SANGAM</b> <FaPlay className="playbid-icon" /></div>
            <div className="bid-icon-container">
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/halfsangam`)} className="All-in-one">
                    <p className="spade-icon">&#9824;</p>
                    <p>HALF SANGAM</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/fullsangam`)} className="All-in-one">
                    <FaDiceThree className="gamepad-icon" />
                    <p>FULL SANGAM</p>
                </div>

            </div>

        </div>

       

        

        <div className="digit-bid">
            <div className="bid-heading"><b>CYCLE BID</b> <FaPlay className="playbid-icon" /></div>
            <div className="bid-icon-container">
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/cppanna`)} className="All-in-one">
                    <p className="spade-icon">&#9824;</p>
                    <p>CP PANA</p>
                </div>

            </div>

        </div>

        <div className="digit-bid">
            <div className="bid-heading"><b>MOTOR BID</b> <FaPlay className="playbid-icon" /></div>
            <div className="bid-icon-container">
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/sppanna`)} className="All-in-one">
                    <p className="spade-icon">&#9824;</p>
                    <p>SP MOTOR</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/dppanna`)} className="All-in-one">
                    <FaDiceThree className="gamepad-icon" />
                    <p>DP MOTOR</p>
                </div>

            </div>

        </div>
        </>
    )
}

export default Bid;