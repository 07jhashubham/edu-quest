import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from '../context/context.jsx'; // Import the Web3 context

const ThreeScene = React.lazy(() => import("../ThreeScene"));

export default function Home() {
  const { connectWallet, account, balance , shortenAddress } = useWeb3(); // Access the Web3 functions

  return (
    <div>
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

<button className="bg-lime-400 px-4 py-2 rounded">
{shortenAddress(account)}
</button>

            // <div className="flex items-center">
            //   <span className="mr-4">Account: {account}</span>
            //   {balance !== null && <span>Balance: {balance} ETH</span>}
            // </div>
          ) : (
            <button onClick={connectWallet} className="bg-lime-400 px-4 py-2 rounded">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mx-8">
        <div className="text-white text-4xl">Hello, Welcome to the DApp!</div>
        <div className="flex-shrink-0">
          <Suspense fallback={<div>Loading scene...</div>}>
            <ThreeScene />
          </Suspense>
        </div>
      </div>
    </div>
  );
}




// import React, { Suspense } from "react";
// import { Link } from "react-router-dom";
// import { useWeb3 } from '../context/context.jsx'; // Import the Web3 context

// const ThreeScene = React.lazy(() => import("../ThreeScene"));

// export default function Home() {
//   const { connectWallet, account, balance } = useWeb3(); // Access the Web3 functions

//   return (
//     <div>
//       <div className="w-full h-24 bg-black flex justify-between">
//         <img src="/img/logo.png" className="ml-12" alt="Logo" />
//         <div className="flex justify-around items-center text-white text-2xl space-x-32 mr-24">
//           <Link
//             to="/"
//             className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
//           >
//             Home
//           </Link>
//           <Link
//             to="/answer"
//             className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
//           >
//             Answer
//           </Link>
//           <Link
//             to="/ask"
//             className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
//           >
//             Ask
//           </Link>
//           <Link
//             to="/dashboard"
//             className="hover:border-b-2 transition-all duration-200 hover:text-lime-400 hover:border-lime-400"
//           >
//             Dashboard
//           </Link>
//           {/* Add a button to connect wallet */}
//           {account ? (
//             <div className="flex items-center">
//               <span className="mr-4">Account: {account}</span>
//               {balance !== null && <span>Balance: {balance} ETH</span>}
//             </div>
//           ) : (
//             <button onClick={connectWallet} className="bg-lime-400 px-4 py-2 rounded">
//               Connect Wallet
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="flex items-center justify-between mx-8">
//         <div className="text-white text-4xl">Hello, Welcome to the DApp!</div>
//         <div className="flex-shrink-0">
//           <Suspense fallback={<div>Loading scene...</div>}>
//             <ThreeScene />
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// }
