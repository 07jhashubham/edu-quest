import { React, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import { useWeb3 } from "../context/context"; // Import the Web3 context

export default function AnswerList({ answers, openPopup, openQuestionPopup }) {
  const [isLoading, setIsLoading] = useState(false); // State to trigger re-render

  const { voteOnAnswer, SolvableQuestions } = useWeb3(); // Get the voteOnAnswer function from the context
  const handleVote = (answerId) => {
    voteOnAnswer(answerId); // Call the smart contract function
  };

  return (
    <div className="max-w-[1600px] pt-4">
      {/* Display the fetched SolvableQuestions */}
      {SolvableQuestions && SolvableQuestions.length > 0 ? (
        SolvableQuestions.map((question, index) => (
          <div
            key={question[0].toString() + index}
            className="mx-8 mb-6 rounded-lg border-b-lime-300 border-l-lime-300 bg-black px-6 py-3 font-mono text-lime-300 shadow-lg hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 cursor-pointer"
            onClick={() => openQuestionPopup(question)} // Handle the popup for questions
          >
            <div className="flex items-center text-sm text-pink-400">
              <AccountCircleIcon className="mr-2 h-8 w-8" />
              <span className="hover:text-lime-300">
                {`Question ${index + 1}`}
              </span>
            </div>
            <p className="text-xl">{question[1]}</p>
            <div className="flex w-full items-end justify-between">
              <div className="flex items-center">
                <StarIcon className="h-3 w-4 mr-5" />
                <span className=" text-pink-400 hover:text-lime-300 text-xs">
                  ID: {question[0].toString()}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">Load questions please</p>
      )}

      {/* Display the answers */}
      {answers.map((answer) => (
        <div
          key={answer.id}
          className="mx-8 mb-6 rounded-lg border-b-lime-300 border-l-lime-300 bg-black px-6 py-3 font-mono text-lime-300 shadow-lg hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 cursor-pointer"
          onClick={() => openPopup(answer)}
        >
          <div className="flex items-center text-sm text-pink-400">
            <AccountCircleIcon className="mr-2 h-8 w-8" />
            <span className="hover:text-lime-300">{answer.username}</span>{" "}
            <span className="ml-2 text-xs hover:text-lime-300">
              {answer.rating}
            </span>
          </div>
          <p className="text-xl">{answer.content}</p>
          <div className="flex w-full items-end justify-between">
            <div className="flex items-center">
              {answer.options && answer.options.length > 0 && (
                <StarIcon className="h-3 w-4 mr-5" />
              )}
              <span className=" text-pink-400 hover:text-lime-300 text-xs">
                ID: {answer.id}
              </span>
            </div>

            <div className="text-pink-400 hover:text-lime-300">
              Amount: {answer.amount}
            </div>
          </div>
          {/* Add a button to vote on this answer */}
          <button onClick={() => handleVote(answer.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}



// import { React, useEffect, useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import StarIcon from "@mui/icons-material/Star";
// import { useWeb3 } from "../context/context"; // Import the Web3 context

// export default function AnswerList({ answers, openPopup }) {
//   const [isLoading, setIsLoading] = useState(false); // State to trigger re-render

//   const { voteOnAnswer, SolvableQuestions } = useWeb3(); // Get the voteOnAnswer function from the context
//   const handleVote = (answerId) => {
//     voteOnAnswer(answerId); // Call the smart contract function
//   };

//   return (
//     <div className="max-w-[1600px] pt-4">
//       {/* Display the fetched SolvableQuestions */}
//       {SolvableQuestions && SolvableQuestions.length > 0 ? (
//         SolvableQuestions.map((question, index) => (
//           <div
//             key={question[0].toString() + index}
//             className="mx-8 mb-6 rounded-lg border-b-lime-300 border-l-lime-300 bg-black px-6 py-3 font-mono text-lime-300 shadow-lg hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 cursor-pointer"
//           >
//             <div className="flex items-center text-sm text-pink-400">
//               <AccountCircleIcon className="mr-2 h-8 w-8" />
//               <span className="hover:text-lime-300">
//                 {`Question ${index + 1}`}
//               </span>
//             </div>
//             <p className="text-xl">{question[1]}</p>
//             <div className="flex w-full items-end justify-between">
//               <div className="flex items-center">
//                 <StarIcon className="h-3 w-4 mr-5" />
//                 <span className=" text-pink-400 hover:text-lime-300 text-xs">
//                   ID: {question[0].toString()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-white">Load questions please</p>
//       )}

//       {/* Display the answers */}
//       {answers.map((answer) => (
//         <div
//           key={answer.id}
//           className="mx-8 mb-6 rounded-lg border-b-lime-300 border-l-lime-300 bg-black px-6 py-3 font-mono text-lime-300 shadow-lg hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 cursor-pointer"
//           onClick={() => openPopup(answer)}
//         >
//           <div className="flex items-center text-sm text-pink-400">
//             <AccountCircleIcon className="mr-2 h-8 w-8" />
//             <span className="hover:text-lime-300">{answer.username}</span>{" "}
//             <span className="ml-2 text-xs hover:text-lime-300">
//               {answer.rating}
//             </span>
//           </div>
//           <p className="text-xl">{answer.content}</p>
//           <div className="flex w-full items-end justify-between">
//             <div className="flex items-center">
//               {answer.options && answer.options.length > 0 && (
//                 <StarIcon className="h-3 w-4 mr-5" />
//               )}
//               <span className=" text-pink-400 hover:text-lime-300 text-xs">
//                 ID: {answer.id}
//               </span>
//             </div>

//             <div className="text-pink-400 hover:text-lime-300">
//               Amount: {answer.amount}
//             </div>
//           </div>
//           {/* Add a button to vote on this answer */}
//           <button onClick={() => handleVote(answer.id)}>Vote</button>
//         </div>
//       ))}
//     </div>
//   );
// }
