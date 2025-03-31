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
    const [betType, setBetType]= useState("open");
    const [bet, setBet]= useState([]);
    const singleArray= [0,1,2,3,4,5,6,7,8,9];
    const doubleArray= [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]
    const spArray=[128, 137, 146, 236, 245, 290, 380, 470, 489, 560, 579, 678,
        129, 138, 147, 156, 237, 246, 345, 390, 480, 570, 589, 679,
       120, 139, 148, 157, 238, 247, 256, 346, 490, 580, 670, 689,
        130, 149, 158, 167, 239, 248, 257, 347, 356, 590, 680, 789,
        140, 159, 168, 230, 249, 258, 267, 348, 357, 456, 690, 780,
        123, 150, 169, 178, 240, 259, 268, 349, 358, 367, 457, 790,
        124, 160, 278, 179, 250, 269, 340, 359, 368, 458, 467, 890,
        125, 134, 170, 189, 260, 279, 350, 369, 468, 378, 459, 567,
        126, 135, 180, 234, 270, 289, 360, 379, 450, 469, 478, 568,
        127, 136, 145, 190, 235, 280, 370, 389, 460, 479, 569, 578];
    
    const dpArray=[100, 119, 155, 227, 335, 344, 399, 588, 669,
        110, 200, 228, 255, 366, 499, 660, 688, 778,
        166, 229, 300, 337, 355, 445, 599, 779, 788,
         112, 220, 266, 338, 400, 446, 455, 699, 770,
        600, 114, 277, 330, 448, 466, 556, 880, 899,
        113, 122, 177, 339, 366, 447, 500, 799, 889, 
        115, 133, 188, 223, 377, 449, 557, 566, 700,
        116, 224, 233, 288, 440, 477, 558, 800, 990,
        117, 144, 199, 225, 388, 559, 577, 667, 900,
        118, 226, 244, 299, 334, 488, 550, 668, 677];

    const cpArray=[111,222,333,444,555,666,,777,888,999];
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


      const handleSingleInput = (e, index, typee) => {
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
                    bidName: typee,
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
            setChoice("singlepanna");
        }else if(bidName==="doublebid"){
            const object= {singlebid: false, doublebid: !selectedBids.doublebid, triplebid: false};
            setSelectedBids(object);
            setChoice("doublepanna");
        }else{
            const object= {singlebid: false, doublebid: false, triplebid: !selectedBids.triplebid};
            setSelectedBids(object)
            setChoice("triplepanna");
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


        
        {(bidName==="allpanna" || bidName==="fullsangam" || bidName==="halfsangam") &&(<div className="placebid-container">
                <form onSubmit={handleSubmit} className="login-form">
                   

                    {bidName==="allpanna" && (
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
                        <input onChange={(e)=>handleSingleInput(e,index, "singledigit")} type="Number" className="singleInput"/>
                    </div>
                ))}
                <button type="submit" className="register-button">ADD BID</button>
            </div>
            </form>)}
        </div>

        <div className="placebid-container">
        {bidName==="jodidigit" &&(
            <form onSubmit={handleSingleSubmit}>
                <div className="single-container">
                {doubleArray.map((double, index)=>(
                    <div className="single-digit-container">
                        <div key={index} className="singleHeading">{double}</div>
                        <input onChange={(e)=>handleSingleInput(e,double,"jodidigit")} type="Number" className="doubleInput"/>
                    </div>
                ))}
                <button type="submit" className="register-button">ADD BID</button>
            </div>
            </form>)}
        </div>

        <div className="placebid-container">
        {(bidName==="singlepanna" || bidName==="sppanna") &&(
            <form onSubmit={handleSingleSubmit}>
                <div className="single-container">
                {spArray.map((double, index)=>(
                    <div className="single-digit-container">
                        <div key={index} className="singleHeading">{double}</div>
                        <input onChange={(e)=>handleSingleInput(e,double, "singlepanna")} type="Number" className="doubleInput"/>
                    </div>
                ))}
                <button type="submit" className="register-button">ADD BID</button>
            </div>
            </form>)}
        </div>

        <div className="placebid-container">
        {(bidName==="doublepanna" || bidName==="dppanna") &&(
            <form onSubmit={handleSingleSubmit}>
                <div className="single-container">
                {dpArray.map((double, index)=>(
                    <div className="single-digit-container">
                        <div key={index} className="singleHeading">{double}</div>
                        <input onChange={(e)=>handleSingleInput(e,double,"doublepanna")} type="Number" className="doubleInput"/>
                    </div>
                ))}
                <button type="submit" className="register-button">ADD BID</button>
            </div>
            </form>)}
        </div>

        <div className="placebid-container">
        {(bidName==="triplepanna" || bidName==="cppanna") &&(
            <form onSubmit={handleSingleSubmit}>
                <div className="single-container">
                {cpArray.map((double, index)=>(
                    <div className="single-digit-container">
                        <div key={index} className="singleHeading">{double}</div>
                        <input onChange={(e)=>handleSingleInput(e,double, "triplepanna")} type="Number" className="doubleInput"/>
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