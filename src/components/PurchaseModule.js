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
    <div>
        
    </div>
      
  )   
}


export default MyModal;


