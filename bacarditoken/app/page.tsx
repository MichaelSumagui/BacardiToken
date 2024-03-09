"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
  //<Import Token>
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0x912789766664F97968B0C74387d2318931ADdE38"; //contract add
    const tokenSymbol = "bacardi";
    const tokenDecimal = 18;

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };
  //</Import Token>

  //Design
  return (
    
<main style={{ backgroundColor: 'grey' }}>
  <p style={{ fontSize: '40px', marginTop: '10px', color: '#8B0000', fontFamily: 'Perpetua Std Titling Roman', textAlign: 'center', fontWeight: 'bold' }}>
    Bacardi Token SHOT NA
  </p>

  <div style={{ minHeight: '25vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <button onClick={() => { connectWallet(); }} className="p-3 bg-red-400 text-white rounded" style={{ color: '#8B0000' }}>
      {walletKey !== "" ? walletKey : " GET SHOT GLASS ((CONNECT WALLET))"}
    </button>

    <button onClick={importToken} className="p-3 bg-red-400 text-white rounded" style={{ marginTop: '10px', color: '#8B0000' }}>
      Import BacardiToken
    </button>
  </div>

  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around', color: '#8B0000' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <form>
        <label> Input Amount To Shot</label><br></br>
        <input
          type="number"
          value={mintingAmount}
          onChange={(e) => mintAmountChange(e)}
        />
      </form>
      <button
        onClick={() => { mintCoin(); }}
        className="p-3 bg-red-400 text-white rounded">
        {"Mint Token"}
      </button>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <form>
        <label> Input Amount To Tagay</label><br></br>
        <input
          type="number"
          value={stakingAmount}
          onChange={(e) => stakeAmountChange(e)}
        />
      </form>
      <button
        onClick={stakeCoin}
        className="p-3 bg-red-400 text-white rounded">
        {"Stake It"}
      </button>
    </div>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '20vh', color: '#8B0000' }}>
    <br></br>
    <label>SHOT PUNO 1 MINUTE </label>

    <button
      onClick={withdrawCoin}
      className="p-3 bg-red-400 text-white rounded">
      {"SHOT((WITHDRAW))"}
    </button>
  </div>
</main>

  );
}  
