import React from 'react'
import '../App.css'
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export function Marketitem({item}) {
    return(  
   
  <img className = "imgholder" src={'https://cloudflare-ipfs.com/ipfs/QmbAhtqQqiSQqwCwQgrRB6urGc3umTskiuVpgX7FvHhutU/'+ item.toString() + '.png'}  />



    
  )
}

export default Marketitem
