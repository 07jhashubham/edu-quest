import { Link } from "react-router-dom";
import { useWeb3 } from '../context/context'; // Import the Web3 context

export default function DeskNav() {
  const { connectWallet, account } = useWeb3(); // Access the connectWallet function and account

  return (
    <div className="w-full h-24 bg-black flex justify-between">
      <img src="/img/logo.png" className="ml-12" alt="Logo" />
      <div className="flex justify-around items-center text-white text-2xl space-x-32 mr-24">
        <Link
          to="/"
          className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
        >
          Home
        </Link>
        <Link
          to="/answer"
          className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
        >
          Answer
        </Link>
        <Link
          to="/ask"
          className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
        >
          Ask
        </Link>
        <Link
          to="/dashboard"
          className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
        >
          Dashboard
        </Link>
        {/* Add a button to connect wallet */}
        {account ? (
          <span>{account}</span>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
}
