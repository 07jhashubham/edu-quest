import React, { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import eduABI from "../ABI/edu.json";  // Import the ABI

import Web3Modal from "web3modal";
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions: {} // required
});

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

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
      const web3Modal = new Web3Modal();
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

  const connectWallet = async () => {
    console.log("hiiiiii")
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3Modal = new Web3Modal();
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
        console.error("Failed to connect wallet:", error);
        toast.error("Failed to connect to wallet. Please try again.");
      }
    } else {
      toast.error("MetaMask is not installed. Please install MetaMask.");
    }
  };
  
  const updateBalance = async () => {
    if (signer && account) {
      const balance = await signer.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  return (
    <Web3Context.Provider value={{ connectWallet, account, balance, contract }}>
      {children}
    </Web3Context.Provider>
  );
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
  
export { postQuestion, answerQuestion };


// import React, { useState, useContext, createContext, useEffect } from "react";
// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import toast from "react-hot-toast";
// import eduABI from "../ABI/edu.json";

// const Web3Context = createContext();

// export const useWeb3 = () => useContext(Web3Context);

// export const Web3Provider = ({ children }) => {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [balance, setBalance] = useState(null);

//   useEffect(() => {
//     if (provider) {
//       provider.getSigner().getAddress().then(address => {
//         setAccount(address); // Set the account address
//         provider.getBalance(address).then(balance => {
//           setBalance(ethers.utils.formatEther(balance)); // Set the balance in Ether
//         });
//       });
//     }
//   }, [provider]);

//   const connectWallet = async () => {
//     try {
//       const web3Modal = new Web3Modal();
//       const connection = await web3Modal.connect();
//       const provider = new ethers.providers.Web3Provider(connection);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();

//       setProvider(provider);
//       setSigner(signer);
//       setAccount(address); // Update account state

//       const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
//       const contract = new ethers.Contract(contractAddress, eduABI, signer);
//       setContract(contract);

//       const balance = await provider.getBalance(address);
//       setBalance(ethers.utils.formatEther(balance)); // Update balance state
//     } catch (error) {
//       toast.error("Failed to connect to wallet. Please try again.");
//     }
//   };

//   return (
//     <Web3Context.Provider value={{ provider, signer, account, contract, balance, connectWallet }}>
//       {children}
//     </Web3Context.Provider>
//   );
// };
