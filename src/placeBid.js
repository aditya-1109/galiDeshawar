import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./placebid.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


const PlaceBid=()=>{

    const number= localStorage.getItem("code");
    const [user, setUser]= useState(null);
    const link= process.env.REACT_APP_LINK;
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
    const doubleArray= [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]
    const [data, setData]= useState(null);
    const [fixBet, setFixBet]= useState([]);
    const leftRef= useRef("");
    const middleRef= useRef("");
    const rightRef= useRef("");
    const [selectedBids, setSelectedBids] = useState({ singlebid: true, doublebid: false, triplebid: false});
    const [choice, setChoice]= useState("singlebid");
    const openSangamRef= useRef("");
    const closeSangamRef= useRef("");
    const [todayBet, setTodayBet]= useState(null);

    

    useEffect(() => {
        const getData = async () => {
            const dat= new Date;
            const day= dat.getDate();
            const month= dat.getMonth() +1;
            const date= `${day}/${month}`;

          const response = await axios.get(`${link}/lotteryData`);
          response.data.forEach((lottery)=>{
            if(lottery.lotteryName===lotteryName){
                setData(lottery)
                lottery.winningNumber.forEach((bett)=>{
                    if(bett.date===date){
                        setTodayBet(bett);
                    }
                })
            }
          })
        };
    
        if(!data){
        getData();
        }
      }, []);

      useEffect(()=>{
        const getUSer= async() =>{
            const response= await axios.post(`${link}/getUser`, {number});
            setUser(response.data.user);
        }
        getUSer()
      },[])


      const handleSingleInput = (e, index) => {
        if (e.target.value !== "") {
            let updated = false;
            const amount= parseInt(e.target.value);
            
            const updatedBet = bet.map((bett) => {
                if (bett.digit === index) {
                    updated = true;
                    return { ...bett, amount }; 
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
                    amount: amount,
                    digit: index,
                    status: false,
                };
                setBet((prev) => [...prev, object]); 
            }
        }

    };

    const handledoubleInput = (e, index) => {
        if (e.target.value !== "") {
            let updated = false;
            const amount= parseInt(e.target.value);
            
            const updatedBet = bet.map((bett) => {
                if (bett.digit === index) {
                    updated = true;
                    return { ...bett, amount }; 
                }
                return bett; 
            });
    
            if (updated) {
                setBet(updatedBet); 
            } else {
                
                const object = {
                    betName: lotteryName,
                    betType,
                    bidName: "doubleDigit",
                    amount: amount,
                    digit: index,
                    status: false,
                };
                setBet((prev) => [...prev, object]); 
            }
        }

    };

    const handleSangam=()=>{
        if(openSangamRef.current.value!=="" && closeSangamRef.current.value!==""){
            let object;
            if(betType==="open"){
                object= {amount: 0, bidName , betName:lotteryName, betType, digit: openSangamRef.current.value, sangam: closeSangamRef.current.value, status: false}
            }else{
                object= {amount: 0, bidName , betName:lotteryName, betType, digit: openSangamRef.current.value, sangam: closeSangamRef.current.value, status: false}
            }
            setBet([object]);
            
        }
    }
    

    const handleEvenOdd=(value)=>{
        if(value==="even"){
            const bett= [{amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 0, status: false},{amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 2, status: false}, {amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 4, status: false}, {amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 6, status: false}, {amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 8, status: false} ]
            setBet(bett);
            setEvenOdd("even")
        }else if(value==="odd"){
            const bett= [{amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 1, status: false},{amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 3, status: false}, {amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 5, status: false}, {amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 7, status: false}, {amount: 0, bidName: "oddeven", betName:lotteryName, betType, digit: 9, status: false} ]
            setBet(bett);
            setEvenOdd("odd")
        }else if(value==="halfred"){
            const bett= [{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 5, status: false},{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 16, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit:27, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 38, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 49, status: false},{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 50, status: false},{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 61, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit:72, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 83, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 94, status: false}  ]
            setBet(bett);
            setEvenOdd("even")
            
        }else if(value==="fullred"){
            const bett= [{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 0, status: false},{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 11, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit:22, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 33, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 44, status: false},{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 55, status: false},{amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 66, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit:77, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 88, status: false}, {amount: 0, bidName: "redbracket", betName:lotteryName, betType, digit: 99, status: false}  ]
            setBet(bett);
            setEvenOdd("odd")
           
        }
    }

    const checkBid=(bidDigit)=>{
        if(bidDigit.charAt(0)!==bidDigit.charAt(1) && bidDigit.charAt(2)!==bidDigit.charAt(1) && bidDigit.charAt(0)!==bidDigit.charAt(2)){
            return "singlebid"
        }else if(bidDigit.charAt(0)===bidDigit.charAt(1) && bidDigit.charAt(2)!==bidDigit.charAt(1) && bidDigit.charAt(0)!==bidDigit.charAt(2)){
            return "doublebid"
        }else if(bidDigit.charAt(0)!==bidDigit.charAt(1) && bidDigit.charAt(2)===bidDigit.charAt(1) && bidDigit.charAt(0)!==bidDigit.charAt(2)){
            return "doublebid"
        }else if(bidDigit.charAt(0)!==bidDigit.charAt(1) && bidDigit.charAt(2)!==bidDigit.charAt(1) && bidDigit.charAt(0)===bidDigit.charAt(2)){
            return "doublebid"
        }else{
            return "triplebid"
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
                if(getBidName==="singlebid"){
                    setBet((prev)=>[...prev, {amount: 0, bidName: "singlepanna", betName:lotteryName, betType, digit: newDigit, status: false}])
                }else if(getBidName==="doublebid"){
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

    const handleDoubleSubmit=(e)=>{
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
                    if(bidName==="cppanna" || bidName==="panafamily"){
                        bidName=checkBid(digitRef.current.value);
                    }
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
        if(todayBet?.status==="CLOSED"){
            alert("this is closed now!!")
        }else if(todayBet?.status==="OPENED" && betType==="open"){
            alert("couldn't place open bet for this")
        }else{
            let total=0;
            fixBet.forEach((bett)=>{
                const amount= parseInt(bett.amount);
                total +=amount;
            })

            console.log(total, user?.wallet);
            if(total<=user?.wallet){
            const response= await axios.post(`${link}/setBet`, {fixBet, number});
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
            
            <div className="open-close">
                <button onClick={()=>setBetType("open")} className={betType==="open"?"open-button":"close-button"}>OPEN</button>
                <button onClick={()=>setBetType("close")} className={betType==="close"?"open-button":"close-button"}>CLOSE</button>
            </div>
        </div>


        
        {(bidName==="allinone" || bidName==="oddeven"  || bidName==="redbracket" || bidName==="singlepanna" || bidName==="doublepanna" || bidName==="triplepanna" || bidName==="singlepatti" || bidName==="doublepatti" || bidName==="jodifamily" || bidName==="panafamily" || bidName==="cppanna" || bidName==="spmotor" || bidName==="dpmotor" || bidName==="halfsangam" || bidName==="fullsangam" || bidName==="choicepanna") &&(<div className="placebid-container">
                <form onSubmit={handleSubmit} className="login-form">
                    {(bidName==="allinone" || bidName==="jodidight" || bidName==="singlepanna" || bidName==="doublepanna" || bidName==="triplepanna" || bidName==="singlepatti" || bidName==="doublepatti" || bidName==="jodifamily" || bidName==="panafamily" || bidName==="cppanna" || bidName==="spmotor" || bidName==="dpmotor") && (
                        <>
                        <label htmlFor="g-pay"><b>Bid Digits</b></label>
                        <input ref={digitRef} className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Digit" />
                        {bidName==="allinone" && <button onClick={validateDigit}>Validate Digit</button>}
                        </>
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
                         <input onChange={handleSangam} ref={openSangamRef} className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Digit" />
                         <label htmlFor="g-pay"><b>Close Pana</b></label>
                         <input onChange={handleSangam} ref={closeSangamRef} className="g-pay" style={{padding:"10px"}} type="number" placeholder="Enter Digit" />
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
        {bidName==="jodidigit" &&(
            <form onSubmit={handleDoubleSubmit}>
                <div className="single-container">
                {doubleArray.map((double, index)=>(
                    <div className="single-digit-container">
                        <div key={index} className="singleHeading">{double}</div>
                        <input onChange={(e)=>handledoubleInput(e,index)} type="Number" className="doubleInput"/>
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