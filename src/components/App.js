import './App.css';
import Header from './Header';
import AddWallet from './AddWallet';
import GetNFTs from './GetNFTs';
import React,{useEffect, useState} from 'react';
import { useMoralisWeb3Api } from "react-moralis";



function App() {
  const Web3Api = useMoralisWeb3Api();
  const [nfts,setNfts] = useState([]);
  const [mywallet,setmyWallet] = useState("");
  const fetchNFTs = async () => {
    const address=mywallet;
    const options = {
      address: address,
    };
    console.log("options: ",options);
    const ethNFTs = await Web3Api.account.getNFTs(options);
    console.log(ethNFTs.result);
    setNfts(...nfts ,ethNFTs.result);
  };
  const addwalletHandler=(wallet)=>{
    console.log(wallet.wallet);
    setmyWallet([...mywallet,wallet.wallet]);
  }
  useEffect(()=>{
    fetchNFTs();
  },[mywallet]);
  return (
    <div className='container'>
    <Header/>
    <AddWallet addwalletHandler={addwalletHandler}/>
    <GetNFTs nfts={nfts}/>
    </div>
    
  );
}

export default App;
