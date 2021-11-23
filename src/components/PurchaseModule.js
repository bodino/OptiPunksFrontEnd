import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import useLocalStorage from '../Hooks/useLocalStorage'
import '../App.css';
import metamask from "../metamask.svg"
import walletConnectIcon from "../walletconnecticon.png"
import { NetworkErrorMessage } from "./NetworkErrorMessage";



export function MyModal({transferTokens,networkError,dismiss}) {
    
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);

  const [selectedAddress1, setselectedAddress] = useLocalStorage('useraddress123', 0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [input, setInput] = useState(1);





  return (

<div className ="css-1qqp0n5v2">
             
              {/* <p className= "rainbowlogintext">  
                <a classname = "rainbowlogintext, moretext">
                  <b> Quantity </b>
                </a>
              </p> */}
           
           
              <input type="number" class="quantityInput__3YZli" placeholder="APE IN ANON" value={input} onInput={e => setInput(e.target.value)} max="20" min="1" ></input>

           
            <div onClick={() => {transferTokens(input);}} className="css-5n3810v2">
              <a  className="rainbowlogintextinverse" >
              Mint OptiPunk
              </a> 

            
            </div>   
            <div className = "fontsizesmall">
                Max of 20 per address <br/> 
                </div>
            
            {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss}
              
            />
          )}
              
             
</div>

 

    
  )   
}


export default MyModal;


