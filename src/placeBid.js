import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./placebid.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const PlaceBid=()=>{

    const number= localStorage.getItem("number");
    const [user, setUser]= useState(null);
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
    const [bet, setBet]= useState([]);
    const singleArray= [0,1,2,3,4,5,6,7,8,9];
    const [data, setData]= useState(null);
    const [fixBet, setFixBet]= useState([]);
    const leftRef= useRef("");
    const middleRef= useRef("");
    const rightRef= useRef("");
    const [selectedBids, setSelectedBids] = useState({ singlebid: true, doublebid: false, triplebid: false});
    const [choice, setChoice]= useState("singlebid");

    useEffect(()=>{
        if(bidName==="oddeven"){
            const bett= [{amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 1, status: false},{amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 3, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 5, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 7, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 9, status: false} ]
            setBet(bett);
        }else if(bidName==="redbracket"){
            const bett= [{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 0, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 11, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit:22, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 33, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 44, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 55, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 66, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit:77, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 88, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 99, status: false}  ]
            setBet(bett);
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

      useEffect(()=>{
        const getUSer= async() =>{
            const response= await axios.post("https://first-backend-81m3.onrender.com/getUser", {number});
            setUser(response.data);
        }
        getUSer()
      },[])


      const handleSingleInput = (e, index) => {
        if (e.target.value !== "") {
            let updated = false;
    
            const updatedBet = bet.map((bett) => {
                if (bett.digit === index) {
                    updated = true;
                    return { ...bett, amount: e.target.value }; 
                }
                return bett; 
            });
    
            if (updated) {
                setBet(updatedBet); 
            } else {
                
                const object = {
                    betName: lotteryName,
                    betType,
                    bidName: "singleDigit",
                    amount: e.target.value,
                    digit: index,
                    status: false,
                };
                setBet((prev) => [...prev, object]); 
            }
        }

    };
    

    const handleEvenOdd=(value)=>{
        if(value==="even"){
            const bett= [{amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 0, status: false},{amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 2, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 4, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 6, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 8, status: false} ]
            setBet(bett);
            setEvenOdd("even")
        }else if(value==="odd"){
            const bett= [{amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 1, status: false},{amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 3, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 5, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 7, status: false}, {amount: "", bidName: "oddeven", betName:lotteryName, betType, digit: 9, status: false} ]
            setBet(bett);
            setEvenOdd("odd")
        }else if(value==="halfred"){
            const bett= [{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 5, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 16, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit:27, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 38, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 49, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 50, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 61, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit:72, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 83, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 94, status: false}  ]
            setBet(bett);
            setEvenOdd("even")
            
        }else if(value==="fullred"){
            const bett= [{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 0, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 11, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit:22, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 33, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 44, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 55, status: false},{amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 66, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit:77, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 88, status: false}, {amount: "", bidName: "redbracket", betName:lotteryName, betType, digit: 99, status: false}  ]
            setBet(bett);
            setEvenOdd("odd")
           
        }
    }

    const checkBid=(bidDigit)=>{
        if(bidDigit.charAt(0)!==bidDigit.charAt(1) && bidDigit.charAt(2)!==bidDigit.charAt(1) && bidDigit.charAt(0)!==bidDigit.charAt(2)){
            return "single"
        }else if(bidDigit.charAt(0)===bidDigit.charAt(1) && bidDigit.charAt(2)!==bidDigit.charAt(1) && bidDigit.charAt(0)!==bidDigit.charAt(2)){
            return "double"
        }else if(bidDigit.charAt(0)!==bidDigit.charAt(1) && bidDigit.charAt(2)===bidDigit.charAt(1) && bidDigit.charAt(0)!==bidDigit.charAt(2)){
            return "double"
        }else if(bidDigit.charAt(0)!==bidDigit.charAt(1) && bidDigit.charAt(2)!==bidDigit.charAt(1) && bidDigit.charAt(0)===bidDigit.charAt(2)){
            return "double"
        }else{
            return "triple"
        }
    }
    
    const validateDigit = (e) => {
        e.preventDefault();

        const newDigit = digitRef.current.value.trim(); // Trim whitespace to avoid invalid inputs

        if (!newDigit) {
            alert("Please enter a digit.");
            
        }
    
        if (!/^\d+$/.test(newDigit)) {
            alert("The input must be numeric.");
            
        }  
        if(newDigit.length===1){
                setBet((prev)=>[...prev, {amount: 0, bidName: "singledigit", betName:lotteryName, betType, digit: newDigit, status: false}])
            }else if(newDigit.length===2){
                setBet((prev)=>[...prev, {amount: 0, bidName: "jodidight", betName:lotteryName, betType, digit: newDigit, status: false}])
            }else if(newDigit.length===3){
                const getBidName= checkBid(newDigit);
                if(getBidName==="single"){
                    setBet((prev)=>[...prev, {amount: 0, bidName: "singlepanna", betName:lotteryName, betType, digit: newDigit, status: false}])
                }else if(getBidName==="double"){
                    setBet((prev)=>[...prev, {amount: 0, bidName: "doublepanna", betName:lotteryName, betType, digit: newDigit, status: false}])
                }else{
                    setBet((prev)=>[...prev, {amount: 0, bidName: "triplepanna", betName:lotteryName, betType, digit: newDigit, status: false}])
                }
                
            }else{
                alert("The input is not valid!!")
            }
            digitRef.current.value = ""; 
        
    };

    const handleSingleSubmit=(e)=>{
        e.preventDefault();
        setFixBet((prev)=>[...prev, ...bet]);
        setBet([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const amount = parseFloat(amountRef.current.value); 
        if (!amount) {
            alert("Please enter a valid amount");
        } else if (amount < 10) {
            alert("The minimum amount is 10");
        } else {
            if(bet.length>0){
            const updatedBet = bet.map((bett) => ({
                ...bett,
                amount: amount, 
            }));
    
            setFixBet((prev) => [...prev, ...updatedBet]);
            }else{
                if(digitRef.current.value!==""){
                    const object={amount, bidName, betName:lotteryName, betType, digit: digitRef.current.value, status: false};
                setFixBet((prev)=>[...prev,object])
                }else{
                    alert("Please enter the Number")
                }
            }
    
            setBet([]);
        }
    };

    const handleChoiceInput=()=>{
        if(leftRef.current.value!=="" && middleRef.current.value!=="" && rightRef.current.value!==""){
            setBet([{amount: 0, bidName: choice, betName:lotteryName, betType, digit: `${leftRef.current.value}${middleRef.current.value}${rightRef.current.value}`, status: false}])
        }
    }

    const handleChoiceBid = (bidName) => {
        if(bidName==="singlebid"){
            const object= {singlebid: !selectedBids.singlebid, doublebid: false, triplebid: false};
            setSelectedBids(object);
            setChoice("singlebid");
        }else if(bidName==="doublebid"){
            const object= {singlebid: false, doublebid: !selectedBids.doublebid, triplebid: false};
            setSelectedBids(object);
            setChoice("doublebid");
        }else{
            const object= {singlebid: false, doublebid: false, triplebid: !selectedBids.triplebid};
            setSelectedBids(object)
            setChoice("triplebid");
        }
    };


    const sendData=async()=>{
        if(data?.status==="CLOSED"){
            alert("this is closed now!!")
        }else if(data?.status==="OPENED" && betType==="open"){
            alert("couldn't place open bet for this")
        }else{
            let total=0;
            fixBet.forEach((bett)=>{
                total +=bett.amount;
            })
            if(total<=user.wallet){
            const response= await axios.post("https://first-backend-81m3.onrender.com/setBet", {fixBet, number});
            if(response.data.success){
                alert("Bet placed Successfully")
            }else{
                alert("couldn't placed the bet");
            }
        }else{
            alert("You have not enough balance");
        }
        }
        
        setFixBet([]);
    }

    console.log(fixBet)
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
                        {bidName==="allinone" && <button onClick={validateDigit}>Validate Digit</button>}
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
                                    <input type="checkbox" onChange={()=>handleChoiceBid("singlebid")} checked={selectedBids.singlebid} className="custom-checkbox" id="checkboxSP" />
                                    <label htmlFor="checkboxSP">SP</label>
                                </div>
                                <div className="choicpanaInputContainer">
                                    <input type="checkbox" onChange={()=>handleChoiceBid("doublebid")} checked={selectedBids.doublebid}  className="custom-checkbox" id="checkboxDP" />
                                    <label htmlFor="checkboxDP">DP</label>
                                </div>
                                <div className="choicpanaInputContainer">
                                    <input type="checkbox" onChange={()=>handleChoiceBid("triplebid")} checked={selectedBids.triplebid}  className="custom-checkbox" id="checkboxTP" />
                                    <label htmlFor="checkboxTP">TP</label>
                                </div>
                            </form>

                            <form className="option-container">
                                <div className="choicpanaDigitInputContainer">
                                    <div>Left Digit</div>
                                    <input ref={leftRef} onChange={handleChoiceInput} type="text" placeholder="Enter Left Digit"/>
                                </div>
                                <div className="choicpanaDigitInputContainer">
                                    <div>Middle Digit</div>
                                    <input ref={middleRef} onChange={handleChoiceInput} type="text" placeholder="Enter Middle Digit" />
                                </div>
                                <div className="choicpanaDigitInputContainer">
                                    <div>Right Digit</div>
                                    <input ref={rightRef} onChange={handleChoiceInput} type="text" placeholder="Enter Right Digit"/>
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
                    {bet && bet.map((digi, index)=>(
                        <div key={index} className="digitContainer">{digi.digit}</div>
                    ))}
                    </div>
                    <label htmlFor="phonepay"><b>Bid Points</b></label>
                    <input ref={amountRef} className="phonepay" style={{padding:"10px"}} type="number" placeholder="Enter Amount" />
                    <button type="submit" className="register-button">ADD BID</button>
                </form>
        
        </div>)}
        
        <div className="placebid-container">
        {bidName==="singledigit" &&(
            <form onSubmit={handleSingleSubmit}>
                <div className="single-container">
                {singleArray.map((single, index)=>(
                    <div className="single-digit-container">
                        <div key={index} className="singleHeading">{single}</div>
                        <input onChange={(e)=>handleSingleInput(e,index)} type="Number" className="singleInput"/>
                    </div>
                ))}
                <button type="submit" className="register-button">ADD BID</button>
            </div>
            </form>)}
        </div>

            <div className="placebid-container">
                <table className="table">
                    {fixBet.length > 0 ? (
                        <>
                        <thead>
                            <tr>
                            <th>Type</th>
                            <th>Digit</th>
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fixBet.map((bets, index) => (
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