import './App.css';
import { ethers } from "ethers";
import Vector from './Vector.png'
import LoginButton from './LoginButton.png'
import Account from './Group 3Acount.png'
import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row, Container } from 'react-bootstrap';
import useLocalStorage from './Hooks/useLocalStorage'
import backgroundreal from './backgroundreal.eps'
import { providers } from "ethers";


import ERC1155 from "./contracts/ERC1155.json";
import TokenArtifact from "./contracts/GLDToken.json";
import fmmTokenArtifact from "./contracts/FunctionalMarketMaker.json";
import ConditionalTokens from "./contracts/ConditionalTokens.json";
import contractAddress from "./contracts/contract-address.json";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'


import MyModal from "./components/MyModal"
import MarketBox from "./components/Marketbox"
import MarketGrid from "./components/MarketGrid"
import PurchaseModule from "./components/PurchaseModule"

import logo from "./optipunkgif.gif"
import background from "./appbackground.svg"

import { create } from 'ipfs-http-client'
const { BufferList } = require("bl");
var utils = require('ethers').utils;

const ipfs = create({ host: "ipfs.infura.io", port: "5001", protocol: "http"});


const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    console.log(file.path);
    if (!file.content) continue;
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    console.log(content);
    return content;
  }
};



const HARDHAT_NETWORK_ID = '10';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
var status =0;



export class Dapp extends React.Component {

  

  constructor(props) {
    
    super(props);
     
    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      tokenData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: 0,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      show: false,
    };
    this.state = this.initialState;
  }

  
render() {

  return (
    <Router>
      <div className ="background" >
        <div className="AppHeaderBar">
          
          <div className="sizing">
            <a class="socialIcon, css-n6x0i2" href="https://twitter.com/OptiPunk" target="_blank" rel="noopenner noreferrrer">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path class="rainbowFill" d="M256 0a256 256 0 110 512 256 256 0 010-512zm-45 392c113 0 175-94 175-175v-8c12-9 22-20 31-32-11 5-23 8-36 10 13-8 23-20 27-34-11 7-25 12-39 15a62 62 0 00-105 56c-51-3-96-27-126-65a62 62 0 0019 83c-10-1-20-3-28-8v1c0 30 21 54 49 60a61 61 0 01-27 1c7 25 30 42 57 43a124 124 0 01-91 25c27 18 59 28 94 28z"></path>
              </svg>
              

            </a>
            
        

         
              <a class="socialIcon, css-n6x0i2" href="https://discord.gg/uhVqZz5258" target="_blank" rel="noopenner noreferrrer">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="256" class="rainbowFill"></circle><path d="M372 169s-33-26-72-29l-4 7c36 8 52 21 69 36-29-15-58-29-109-29s-80 14-109 29c17-15 37-29 69-36l-3-7c-42 3-73 29-73 29s-37 54-44 160c38 43 95 43 95 43l12-16c-21-7-43-19-63-42 23 18 59 37 116 37s93-19 117-37c-20 23-43 35-63 42l12 16s57 0 94-43c-6-106-44-160-44-160zM209 300c-14 0-26-13-26-29s12-30 26-30 25 13 25 30-11 29-25 29zm94 0c-14 0-25-13-25-29s11-30 25-30 26 13 26 30-12 29-26 29z" fill="#FFF"></path></svg>
              </a>
          </div>

            
         

   
          <div className="sizingv2">
            <Link class=" rainbowText css-1c7st4f" to="/">
            OptiPunks
            </Link>
          </div>
            
          <div>
            <MyModal 
            connectWallet={() => this._connectWallet()}
            selectedAddress={this.state.selectedAddress}
            />
         </div>



        </div>
       
      </div>

      <div className ="css-1qqp0n5">
            <div className="punkgif">
              <img className="punkgif" src={logo} alt="loading..." />
              <p className= "rainbowlogintextmain">  
                <a classname = "rainbowlogintextmain, moretext">
                 All proceeds Directed To  <br/> 
                </a>
                <a classname = "rainbowlogintextmain, moretext">
                 Public Goods Funding <br/> 
                </a>

                <a classname = "rainbowlogintextmain, moretext">
                MINTING IS complete <br/> 
                </a>
                <a classname = "rainbowlogintextmain, moretext">
                Follow updates on donation process<br/> 
                
                </a>
                <a classname = "rainbowlogintextmain, moretext">
                https://twitter.com/OptiPunk<br/>
                </a>
            
              </p>
            </div>
      </div>

      <div>
        {/* <div>

          <PurchaseModule
          transferTokens={(numbertomint) => this._transferTokens(numbertomint)}
          networkError={this.state.networkError}
            dismiss={() => this._dismissNetworkError()}          
          />
      
        </div> */}
        <div>
        <MarketBox
        findUsersnfts={() => this._findUsersnfts()}
        />
        </div>
      </div>
    </Router>
  );

  if (status === 1) {
      console.log('helloworld!');
    }
  
}
  
  async _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.enable();

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(newAddress);
      
    });
    
    // We reset the dapp state if the network is changed
    window.ethereum.on("networkChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  // This method checks if Metamask selected network is Localhost:8545 
 _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({ 
      networkError: 'Please connect Metamask to Optimism Network'
    });

    return false;
  }
  
  _initialize(userAddress) {
    // This method initializes the dapp
    

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
      
  });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.

    this._intializeEthers();
    this._getTokenData();
    this._startPollingData();
    
  }
  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateBalance(), 10000000);

    // We run it once immediately so we don't have to wait for it
    this._updateBalance();
    
  }

  _resetState() {
    this.setState(this.initialState);
  }

  async _updateBalance() {
    //const balance = await this._token.balanceOf(this.state.selectedAddress);
  //  this.setState({ balance });
  }


  async _checknoprice( ){
  }

  async _getTokenData() {
   // const name = await this._token.name();
   // const symbol = await this._token.symbol();
   // this.setState({ tokenData: { name, symbol } });
  }

    async _intializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);


    // When, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    this._token = new ethers.Contract(
      '0xB8Df6Cc3050cC02F967Db1eE48330bA23276A492',
      TokenArtifact.abi,
      this._provider.getSigner(0)
    );

  
    }


    async _checkyesprice(marketaddress, outcomeIndex, investmentAmount) {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    
    this._functionalmarketmaker = new ethers.Contract(
      marketaddress,
      fmmTokenArtifact.abi,
      this._provider.getSigner(0)


    );

    const yesprice = await this._functionalmarketmaker.calcBuyAmount(1000000,1);
    return yesprice;

  
    }

       async _getCollectionID(conditionId, indexSet) {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._ConditionalToken = new ethers.Contract(
      '0x04C834Bd77fFe1B2828BAee3972A78aB01AB5377',
      ConditionalTokens.abi,
      this._provider.getSigner(0)
      

    );

    const CollectionID = await this._ConditionalToken.getCollectionId('0x0000000000000000000000000000000000000000000000000000000000000000',conditionId,indexSet);
      
      const PositionID = await this._ConditionalToken.getPositionId(contractAddress.Token,CollectionID);
      

      const balance = await this._ConditionalToken.balanceOf(this.state.selectedAddress,PositionID);
      return balance; 
   }

async _findUsersnfts() {
  let collectibleUpdate = [];
  let tokenIndex = 0;
  var tokenId;
  var complete = false; 
  try {
   while (complete == false) {
      // console.log("GEtting token index", tokenIndex);
      tokenId = await this._token.tokenOfOwnerByIndex(this.state.selectedAddress, tokenIndex);
      tokenId = tokenId.toNumber();
      console.log("tokenId", tokenId);
      collectibleUpdate[tokenIndex] = [tokenId];

      tokenIndex++;

   }
  } catch (e) {
    complete = true;
  }
  
return collectibleUpdate;
  
}

async _transferTokensApprove(marketaddress, amount, index) {
  console.log("HI");
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.
    var allowance = await this._token.allowance(this.state.selectedAddress, marketaddress);
    console.log(allowance)

    if (allowance< amount) {
      try {
        this._dismissTransactionError();
  
        // We send the transaction, and save its hash in the Dapp's state. This
        // way we can indicate that we are waiting for it to be mined.
        
      
        const tx = await this._token.approve(marketaddress, amount);
        this.setState({ txBeingSent: tx.hash });
  
        // We use .wait() to wait for the transaction to be mined. This method
        // returns the transaction's receipt.
        // eslint-disable-next-line
        const receipt = await tx.wait();
  
  
          } catch (error) {
            // We check the error code to see if this error was produced because the
            // user rejected a tx. If that's the case, we do nothing.
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
              return;
            }
      
            // Other errors are logged and stored in the Dapp's state. This is used to
            // show them to the user, and for debugging.
            console.error(error);
            this.setState({ transactionError: error });
          } finally {
            // If we leave the try/catch, we aren't sending a tx anymore, so we clear
            // this part of the state.
            this.setState({ txBeingSent: undefined });
          }   
      }


      this._transferTokens(marketaddress, amount, index);
    }

  async _transferTokens(numbertomint) {
    

        try {
          var number = 0.005 *numbertomint;
          number= number.toString();

          number = number.toString(16);
          let overrides = {
            // To convert Ether to Wei:
            value: ethers.utils.parseEther(number) ,    // ether in this case MUST be a string
            gasLimit: 3851430
            // Or you can use Wei directly if you have that:
            // value: someBigNumber
            // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
            // value: "1234567890"
            // value: "0x1234"
        
            // Or, promises are also supported:
            // value: provider.getBalance(addr)
        };
  


      // If a transactiError sending transactionon fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await this._token.mintOptiPunk(numbertomint, overrides);
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that make the transaction fail once it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await this._updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      this.setState({ txBeingSent: undefined });
    } 
  
}

  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

async _sellTokensApprove(marketaddress, amount, index) {
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.
    var approval = await this._ConditionalToken.isApprovedForAll(this.state.selectedAddress, marketaddress);

    if (approval == false) {
      try {
        this._dismissTransactionError();
  
        // We send the transaction, and save its hash in the Dapp's state. This
        // way we can indicate that we are waiting for it to be mined.
        
      
        const tx = await this._ConditionalToken.setApprovalForAll(marketaddress, true);
        this.setState({ txBeingSent: tx.hash });
  
        // We use .wait() to wait for the transaction to be mined. This method
        // returns the transaction's receipt.
        // eslint-disable-next-line
        const receipt = await tx.wait();
  
  
          } catch (error) {
            // We check the error code to see if this error was produced because the
            // user rejected a tx. If that's the case, we do nothing.
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
              return;
            }
      
            // Other errors are logged and stored in the Dapp's state. This is used to
            // show them to the user, and for debugging.
            console.error(error);
            this.setState({ transactionError: error });
          } finally {
            // If we leave the try/catch, we aren't sending a tx anymore, so we clear
            // this part of the state.
            this.setState({ txBeingSent: undefined });
          }   
      }


      this._sellTokens(marketaddress, amount, index);
    }

  async _sellTokens(marketaddress, amount, index) {
        try {
      // If a transactiError sending transactionon fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await this._functionalmarketmaker.sell(0, index,amount);
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that make the transaction fail once it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await this._updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      this.setState({ txBeingSent: undefined });
    } 
  }

async _getPoolBalance(marketaddress) {
  let poolBalances = new Array();
  poolBalances[0] = await this._ConditionalToken.balanceOf(marketaddress, 0);
  poolBalances[1] = await this._ConditionalToken.balanceOf(marketaddress, 1);
  return poolBalances;

}

_dismissNetworkError() {
  this.setState({ networkError: undefined });
}



    

 
}