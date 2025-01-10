import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./placebid.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const PlaceBid=()=>{

    const number= localStorage.getItem("number");
    const nevigate= useNavigate();
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' }); 
    const year = today.getFullYear();
    const formattedDate = `${month}, ${day < 10 ? '0' : ''}${day} ${year}`;
    const digitRef= useRef();
    const amountRef= useRef();
    const {lotteryName}= useParams();
    const {bidName}= useParams();
    const [evenodd, setEvenOdd]= useState("odd");

    const [betType, setBetType]= useState("open");
    const [digit, setDigit]= useState([]);
    const [bet, setBet]= useState([]);
    const singleArray= [0,1,2,3,4,5,6,7,8,9];
    const [data, setData]= useState(null);

    useEffect(()=>{
        if(bidName==="oddeven"){
            setDigit([1,3,5,7,9])
        }else if(bidName==="redbracket"){
            setDigit([0,11,22,33,44,55,66,77,88,99])
        }
    },[])

    useEffect(() => {
        const getData = async () => {
          const response = await axios.get("https://first-backend-81m3.onrender.com/lotteryData");
          response.data.forEach((lottery)=>{
            if(lottery.lotteryName===lotteryName){
                setData(lottery)
            }
          })
        };
    
        if(!data){
        getData();
        }
      }, []);


    const handleSingleInput=(e, index)=>{
        const object={betName:lotteryName, betType,amount: e.target.value, digit: index};
        setBet((prev)=>[...prev, object]);
    }

    const handleEvenOdd=(value)=>{
        if(value==="even"){
            setDigit([0,2,4,6,8]);
            setEvenOdd("even")
            setBet([])
        }else if(value==="odd"){
            setDigit([1,3,5,7,9]);
            setEvenOdd("odd")
            setBet([])
        }else if(value==="halfred"){
            setDigit([5, 16, 27, 38, 49, 50, 61, 72, 83, 94]);
            setEvenOdd("even")
            setBet([])
        }else if(value==="fullred"){
            setDigit([0,11,22,33,44,55,66,77,88,99]);
            setEvenOdd("odd")
            setBet([])
        }
    }
    
    const handleDigit = (e) => {
        e.preventDefault();
        const newDigit = digitRef.current.value;

        if (newDigit) {
            setDigit((prevDigits) => [...prevDigits, newDigit]);
            digitRef.current.value = ""; 
        } else {
            alert("Please enter a single digit (0-9).");
        }
        digitRef.current.value="";
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(digitRef.current.value){
            setDigit((prevDigits) => [...prevDigits, digitRef.current.value]);
        }
        digit.forEach((digi)=>{
            const object={betName:lotteryName, betType, bidName,  amount: amountRef.current.value, digit: digi};
            setBet((prev)=>[...prev, object]);
        })
        digitRef.current.value="";
        amountRef.current.value="";
        setDigit([]);
    }

    const sendData=async()=>{
        if(data?.status==="CLOSED"){
            alert("this is closed now!!")
        }else if(data?.status==="OPENED" && betType==="open"){
            alert("couldn't place open bet for this")
        }else{
            const response= await axios.post("https://first-backend-81m3.onrender.com/setBet", {bet, number});
            if(response.data.success){
                alert("Bet placed Successfully")
            }else{
                alert("couldn't placed the bet");
            }
        }
        
        setBet([]);
    }

    return(
        <>
         <div className="backHome">
                <FaArrowLeft onClick={()=>nevigate("/home")} size={20} />
                <h2>NAME</h2>
        </div>

        <div className="place-bid-header">
            <div className="date"> {formattedDate}</div>
            {(bidName==="jodidight" || bidName==="redbracket")?"":
            <div className="open-close">
                <button onClick={()=>setBetType("open")} className={betType==="open"?"open-button":"close-button"}>OPEN</button>
                <button onClick={()=>setBetType("close")} className={betType==="close"?"open-button":"close-button"}>CLOSE</button>
            </div>}
        </div>

        
        {(bidName==="allinone" || bidName==="oddeven" || bidName==="jodidight" || bidName==="redbracket" || bidName==="singlepanna" || bidName==="doublepanna" || bidName==="triplepanna" || bidName==="singlepatti" || bidName==="doublepatti" || bidName==="jodifamily" || bidName==="panafamily" || bidName==="cppanna" || bidName==="spmotor" || bidName==="dpmotor" || bidName==="halfsangam" || bidName==="fullsangam" || bidName==="choicepanna") &&(<div className="placebid-container">
                <form onSubmit={handleSubmit} className="login-form">
                    {(bidName==="allinone" || bidName==="jodidight" || bidName==="singlepanna" || bidName==="doublepanna" || bidName==="triplepanna" || bidName==="singlepatti" || bidName==="doublepatti" || bidName==="jodifamily" || bidName==="panafamily" || bidName==="cppanna" || bidName==="spmotor" || bidName==="dpmotor") && (
                        <>
                        <label htmlFor="g-pay"><b>Bid Digits</b></label>
                        <input ref={digitRef} className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Digit" />
                        {bidName==="allinone" && <button onClick={handleDigit}>Validate Digit</button>}
                        </>
                    )}

                    {bidName==="oddeven" && (
                        <div className="odd-even-button">
                         <div onClick={()=>handleEvenOdd("even")} className={evenodd==="even"?"open-button":"close-button"}>EVEN</div>
                         <div onClick={()=>handleEvenOdd("odd")} className={evenodd==="odd"?"open-button":"close-button"}>ODD</div>
                        </div>
                    )}

                    {bidName==="redbracket" && (
                        <div className="odd-even-button">
                         <div onClick={()=>handleEvenOdd("halfred")} className={evenodd==="even"?"open-button":"close-button"}>Half Red Bracket</div>
                         <div onClick={()=>handleEvenOdd("fullred")} className={evenodd==="odd"?"open-button":"close-button"}>Full Red Bracket</div>
                        </div>
                    )}

                    {bidName==="choicepanna" && (
                        <div>
                            <form className="option-container">
                                <div className="choicpanaInputContainer">
                                    <input type="checkbox" className="custom-checkbox" id="checkboxSP" />
                                    <label htmlFor="checkboxSP">SP</label>
                                </div>
                                <div className="choicpanaInputContainer">
                                    <input type="checkbox" className="custom-checkbox" id="checkboxDP" />
                                    <label htmlFor="checkboxDP">DP</label>
                                </div>
                                <div className="choicpanaInputContainer">
                                    <input type="checkbox" className="custom-checkbox" id="checkboxTP" />
                                    <label htmlFor="checkboxTP">TP</label>
                                </div>
                            </form>

                            <form className="option-container">
                                <div className="choicpanaDigitInputContainer">
                                    <div>Left Digit</div>
                                    <input type="text" placeholder="Enter Left Digit"/>
                                </div>
                                <div className="choicpanaDigitInputContainer">
                                    <div>Middle Digit</div>
                                    <input type="text" placeholder="Enter Middle Digit" />
                                </div>
                                <div className="choicpanaDigitInputContainer">
                                    <div>Right Digit</div>
                                    <input type="text" placeholder="Enter Right Digit"/>
                                </div>
                            </form>
                        </div>
                    )}

                    {(bidName==="fullsangam" || bidName==="halfsangam") && (
                         <>
                         <label htmlFor="g-pay"><b>Open Pana</b></label>
                         <input ref={digitRef} className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Digit" />
                         <label htmlFor="g-pay"><b>Close Pana</b></label>
                         <input ref={digitRef} className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Digit" />
                         </>
                    )}
                    
                    <div className="allDigitContainer">
                    {digit && digit.map((digi, index)=>(
                        <div key={index} className="digitContainer">{digi}</div>
                    ))}
                    </div>
                    <label htmlFor="phonepay"><b>Bid Points</b></label>
                    <input ref={amountRef} className="phonepay" style={{padding:"10px"}} type="number" placeholder="Enter Amount" />
                    <button type="submit" className="register-button">ADD BID</button>
                </form>
        
        </div>)}
        
        <div className="placebid-container">
        {bidName==="singledigit" &&(<div className="single-container">
                {singleArray.map((single, index)=>(
                    <div className="single-digit-container">
                        <div key={index} className="singleHeading">{single}</div>
                        <input onChange={(e)=>handleSingleInput(e,index)} type="Number" className="singleInput"/>
                    </div>
                ))}
        
        </div>)}
        </div>

            <div className="placebid-container">
                <table className="table">
                    {bet.length > 0 ? (
                        <>
                        <thead>
                            <tr>
                            <th>Type</th>
                            <th>Digit</th>
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bet.map((bets, index) => (
                            <tr key={index}>
                                <td>{bets.betType}</td>
                                <td>{bets.digit}</td>
                                <td>{bets.amount}</td>
                            </tr>
                            ))}
                        </tbody>
                        </>
                    ) : ("")}
                    </table>

                
                

                <button onClick={sendData} className="bid-submit-button">Submit</button>
            

                </div>

        </>
    )
}

export default PlaceBid;