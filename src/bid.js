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
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/allinone`)} className="All-in-one">
                    <FaGamepad className="gamepad-icon" />
                    <p>ALL IN ONE</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/singledigit`)} className="All-in-one">
                    <FaDiceThree className="gamepad-icon" />
                    <p>SINGLE DIGIT</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/oddeven`)} className="All-in-one">
                    <FaDiceSix className="gamepad-icon" />
                    <p>ODD-EVEN</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/jodidight`)} className="All-in-one">
                    <FaDice className="gamepad-icon" />
                    <p>JODI DIGHT</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/redbracket`)} className="All-in-one">
                    <FaDice className="gamepad-icon" />
                    <p>RED-BRACKET</p>
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

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/choicepanna`)} className="All-in-one">
                    <FaGem className="gamepad-icon" />
                    <p>CHOICE PANA</p>
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
            <div className="bid-heading"><b>ALL PATTI</b> <FaPlay className="playbid-icon" /></div>
            <div className="bid-icon-container">
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/singlepatti`)} className="All-in-one">
                    <p className="spade-icon">&#9824;</p>
                    <p>SINGLE PATTI</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/doublepatti`)} className="All-in-one">
                    <p className="spade-icon"><p>&#9824;</p><p style={{marginLeft: "-20px"}}>&#9824;</p></p>
                    <p>DOUBLE PATTI</p>
                </div>

            </div>

        </div>

        <div className="digit-bid">
            <div className="bid-heading"><b>FAMILY BID</b> <FaPlay className="playbid-icon" /></div>
            <div className="bid-icon-container">
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/jodifamily`)} className="All-in-one">
                    <FaDice className="gamepad-icon" />
                    <p>JODI FAMILY</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/panafamily`)} className="All-in-one">
                    
                    <p className="spade-icon">&#9824;</p>
                    <p>PANA FAMILY</p>
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
                <div onClick={()=>nevigate(`/placebid/${lotteryName}/singlepanna`)} className="All-in-one">
                    <p className="spade-icon">&#9824;</p>
                    <p>SP MOTOR</p>
                </div>

                <div onClick={()=>nevigate(`/placebid/${lotteryName}/doublepanna`)} className="All-in-one">
                    <FaDiceThree className="gamepad-icon" />
                    <p>DP MOTOR</p>
                </div>

            </div>

        </div>
        </>
    )
}

export default Bid;