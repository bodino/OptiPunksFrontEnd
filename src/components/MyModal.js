import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import useLocalStorage from '../Hooks/useLocalStorage'
import '../App.css';
import metamask from "../metamask.svg"
import walletConnectIcon from "../walletconnecticon.png"



export function MyModal({connectWallet,selectedAddress}) {
    
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);

  const [selectedAddress1, setselectedAddress] = useLocalStorage('useraddress123', 0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  


  useEffect( ()=>{
    if (selectedAddress1 !== 0) {
        
        connectWallet();
        //console.log(selectedAddress1);
        setStatus(true);
     } 
      
  }, [] );



  return (

      
    <a className="css-5n3810 ">
        <a onClick={handleShow} className="rainbowlogintext" >
            {status ?  "Connected" : "Click to Connect"}
            
        </a>
        <Modal className ="css-pisauv" show={show} onHide={handleClose} animation={false} centered={true}>
          <div className="css-1qqp0n4">

          <div class="css-89fiat">
            <button type="button" class="chakra-button css-iratnv">
              <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-ltqpi4" onClick={() => { handleClose();}}>
                <path fill="currentColor" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z">
                </path>
              </svg>
            </button>
          </div>
            <div className="css-1lh6tyf">

              <div className="css-1r8x5vp">
                <h2 class="chakra-heading css-15l1v17">Choose your wallet provider</h2>
                <div class="css-0">
                  <div class="css-0">
                        <button type="button" class="chakra-button css-m7jr6f" onClick={() => {connectWallet(); handleClose(); setStatus(true); console.log(selectedAddress); setselectedAddress(selectedAddress);}}>
                            
                                <img alt="MetaMask" class="chakra-image css-mxtfqv" src={metamask}></img>
                                <p class="chakra-text css-1dvms1e">MetaMask</p>
                            
                        </button>
                        {/* <button type="button" class="chakra-button css-m7jr6f">
                           
                                <img alt="WalletConnect" class="chakra-image css-mxtfqv" src={walletConnectIcon}></img>
                                <p class="chakra-text css-1dvms1e">WalletConnect</p>
                          
                        </button> */}
                        {/* <button type="button" class="chakra-button css-m7jr6f">
                            <div class="css-7pf6at">
                                <img alt="Coinbase Wallet" class="chakra-image css-mxtfqv" src="./static/media/coinbaseWalletIcon.62578f59.svg"></img>
                                <p class="chakra-text css-1dvms1e">Coinbase Wallet</p>
                            </div>
                        </button> */}
                    </div>
                </div>



              </div>
              

            </div>

         
          </div>
        </Modal>
    </a>
  );    
}


export default MyModal;


