import React from "react"
import Marketitem from "./Marketitem"
import {Link} from 'react-router-dom'
import '../App.css';
import { useLocation } from 'react-router-dom'
import { couldStartTrivia } from "typescript"

export function MarketGrid({items ,isLoading}) {
    console.log(items);
    
    return isLoading ? (<h1></h1>) :     
    <div className = "punkgifv2">
        {items.map((item) =>(
       
        <Marketitem item={item}></Marketitem>
        
  
      


        ))}
    </div>

}
export default MarketGrid