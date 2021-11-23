import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import MarketGrid from "./MarketGrid"



export function MarketBox({findUsersnfts}) {

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false);

  var result = [];

  

  const getData = async () => {
    setIsLoading(true)
    result = await findUsersnfts();
    setItems(result);
    // console.log(result);
    console.log(result);
   // setItems(result.data)
   setIsLoading(false)
  }


  useEffect(() => {
    const fetchItems = async () => {
      
      // const result = await findUsersnfts();

      // console.log(result);

     // setItems(result.data)
     
    }

    fetchItems()
  }, [])
return (
    
<div>
  <div className ="css-1qqp0n5v3"> 
    

  <MarketGrid isLoading={isLoading} items={items} /> 


  <div onClick={() => {result = getData(); }} className="css-5n3810v2" show={isLoading}>
        <a  className="rainbowlogintextinverse" >
        {isLoading ?  "Show My Nfts" : "Refresh"}

        </a>        
      </div>
      <div className ="css-1qqp0n5v4">
      Unofficial punks project unaffiliated with OptimismPBC

    </div>  
     
    </div>
    

  </div>
);
  

}

export default MarketBox