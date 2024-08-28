import React, { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import eduABI from "../ABI/edu.json";  // Import the ABI
import Web3Modal from "web3modal";
import { ethers } from "ethers";

export const ACTIVE_NETWORK = "base_sepolia";  // Define the active network

// Initialize Web3Modal once
const web3Modal = new Web3Modal({
  cacheProvider: true, 
  providerOptions: {} 
});

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (provider && signer) {
      updateBalance();
    }
  }, [provider, signer]);

  const loadProvider = async () => {
    try {
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAccount(address);

      const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
      const contract = new ethers.Contract(contractAddress, eduABI, signer);
      setContract(contract);

      // Fetch the balance
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      toast.error("Failed to connect to wallet");
    }
  };

  const chain = {
    base_sepolia: {
      chainId: `0x${Number(84532).toString(16)}`,
      chainName: "Base Sepolia",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.base.org"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  };

  const changeNetwork = async ({ networkName }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...chain[networkName],
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNetworkSwitch = async () => {
    const networkName = ACTIVE_NETWORK;
    if (!networkName) {
      await changeNetwork({ networkName: "base_sepolia" });
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const firstAccount = accounts[0];

      setAccount(firstAccount);

      await fetchContract(firstAccount);  // Pass the account to fetchContract
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContract = async (connectedAccount) => {
    try {
      if (!connectedAccount) throw new Error("No account connected");

      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contractAddress = "0x87f6d1212ad2A09EF302c5c937FF006424Ef35c8";
      const contract = new ethers.Contract(contractAddress, eduABI, signer);
      setContract(contract);

      // Fetch the balance
      const balance = await provider.getBalance(connectedAccount);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log("Failed to fetch contract", error);
    }
  };

  const updateBalance = async () => {
    if (signer && account) {
      const balance = await signer.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    }
  };
  // Export functions for interacting with the contract
const postQuestion = async (question, options, grant) => {
  try {
    if (!contract) return;
    const tx = await contract.post_question(question, options, { value: ethers.utils.parseEther(grant) });
    await tx.wait();
    toast.success("Question posted successfully!");
  } catch (error) {
    toast.error("Failed to post question");
  }
};

const answerQuestion = async (questionId, optionNumber, comment) => {
  try {
    if (!contract) return;
    const tx = await contract.answer_question(questionId, optionNumber, comment);
    await tx.wait();
    toast.success("Answer submitted successfully!");
  } catch (error) {
    toast.error("Failed to submit answer");
  }
};
  return (
    <Web3Context.Provider value={{ connectWallet, account, balance, contract, postQuestion, answerQuestion }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
