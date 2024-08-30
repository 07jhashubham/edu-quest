import React, { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import eduABI from "../ABI/edu.json";  // Import the ABI
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { BigNumber } from 'ethers'; 

//by me  - 0x5868b4737E0831eE82952E51800ae4f6A55Baf8F

//by momo - 0xd9145CCE52D386f254917e481eB44e9943F39138

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
  const [asked_ques , set_asked_ques] = useState([]);
  const [SolvableQuestions , setSolvableQuestions] = useState([]);
  const [user_quest , setuser_quest] = useState([]);
  const [user_ans , setuser_ans] = useState([]);


  useEffect(() => {
    if (provider && signer) {
      updateBalance();
    }
    getuserquest();
    getuserans();

  }, [provider, signer,account,contract]);

  const loadProvider = async () => {
    try {
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAccount(address);

      const contractAddress = "0x5868b4737E0831eE82952E51800ae4f6A55Baf8F";
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



  // const getSolvableQuestions = async () => {
  //   try {     
  //     if (!contract) return;
      
  //     // Call the smart contract function to get the list of solvable questions
  //     const questions = await contract.solvable_questions();
  
  //     // Assuming `questions` is an array of objects, you can log them
  //     console.log(questions);
  
  //     // Update your state or UI with the fetched questions
  //     setSolvableQuestions(questions); // Example: assuming you have a state setter `setSolvableQuestions`
  
  //     toast.success("Solvable Questions fetched successfully!");
  //   } catch (error) {
  //     toast.error("Failed to fetch solvable questions");
  //     console.error(error); // Optionally log the error for debugging
  //   }
  // }
  const getSolvableQuestions = async () => {
    try {     
      if (!contract) return;
      
      // Fetch all questions from the contract
      const questions = await contract.solvable_questions();
  
      // Filter the questions to include only those that are unanswered
      const filteredQuestions = questions.filter((question) => question.status === 0);
  
      // Update the state with the filtered questions
      setSolvableQuestions(filteredQuestions);
  
      toast.success("Solvable Questions fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch solvable questions");
      console.error(error); // Optionally log the error for debugging
    }
  };
  












  const getuserquest = async () => {
    try {     
      if (!contract) return;
      
      // Call the smart contract function to get the list of solvable questions
      const questions = await contract.asked_questions_history();
  
      // Assuming `questions` is an array of objects, you can log them
      console.log(questions);
      console.log(questions[1].toNumber());

  
      // Update your state or UI with the fetched questions
      setuser_quest(questions); // Example: assuming you have a state setter `setSolvableQuestions`
  
      toast.success("asked Questions fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch asked questions");
      console.error(error); // Optionally log the error for debugging
    }
  }

  const getuserans = async () => {
    try {     
      if (!contract) return;
      
      // Call the smart contract function to get the list of solvable questions
      const questions = await contract.solved_questions();
  
      // Assuming `questions` is an array of objects, you can log them
      console.log(questions);
  
      // Update your state or UI with the fetched questions
      setuser_ans(questions); // Example: assuming you have a state setter `setSolvableQuestions`
  
      toast.success("answered Questions fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch asked questions");
      console.error(error); // Optionally log the error for debugging
    }
  }

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

      const contractAddress = "0x5868b4737E0831eE82952E51800ae4f6A55Baf8F";
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

// const answerQuestion = async (questionId, optionNumber, comment) => {
//   try {
//     if (!contract) return;
//     console.log(contract);
//     const tx = await contract.answer_question(questionId, optionNumber, comment);
//     await tx.wait();
//     toast.success("Answer submitted successfully!");
//   } catch (error) {
//     toast.error("Failed to submit answer");
//   }
// };

const answerQuestion = async (questionId, optionNumber, comment) => {
  try {
    if (!contract) return;
    console.log(contract);
    const tx = await contract.answer_question(questionId, optionNumber, comment);
    await tx.wait();
    toast.success("Answer submitted successfully!");

    // After the question is answered, update the state to remove the answered question
    setSolvableQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.question_id !== questionId)
    );
  } catch (error) {
    toast.error("Failed to submit answer");
  }
};







const shortenAddress = (address) => {
  if (!address) return '';
  return address.slice(0, 5) + '...' + address.slice(address.length - 4);
}
  return (
    <Web3Context.Provider value={{ connectWallet, account, balance, contract, postQuestion, answerQuestion , shortenAddress , getuserquest  , SolvableQuestions , getSolvableQuestions , user_quest , user_ans ,getuserquest , getuserans}}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
