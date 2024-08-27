import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useWeb3 } from '../context/context'; // Import the Web3 context

export default function AnswerPopup({ answer, closePopup }) {
  const { submitAnswer } = useWeb3(); // Get the submitAnswer function from the context

  const handleSubmit = () => {
    submitAnswer(answer.id); // Call the smart contract function
  };

  return (
    <div className="fixed inset-0 z-50 flex w-full flex-col items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative flex w-full flex-col items-center justify-center text-white">
        <div>
          <button
            className="text-white hover:text-gray-500"
            onClick={closePopup}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mx-8 mt-4 w-[80%] max-w-[800px] rounded-lg bg-black px-6 py-4 font-mono">
          <div className="flex items-center justify-between text-pink-400">
            <div className="flex items-center">
              <AccountCircleIcon className="mr-2 h-8 w-8" />
              <span className="text-sm md:text-base hover:text-lime-300">
                {answer.username}
              </span>
              <span className="ml-2 text-xs hover:text-lime-300">
                {answer.rating}
              </span>
            </div>
            <div className="text-pink-400 text-sm hover:text-lime-300">
              Amount: {answer.amount}
            </div>
          </div>
          <p className="mt-4 text-lime-300">{answer.content}</p>

          {answer.options && answer.options.length > 0 && (
            <div className="mt-4">
              <p className="text-white">Options:</p>
              <ul className="list-disc pl-5">
                {answer.options.map((option, index) => (
                  <li key={index} className="text-lime-300">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-col items-center justify-center">
            <textarea
              id="answer-textarea"
              className="h-36 w-full max-w-[92%] overflow-y-auto rounded-lg border-none bg-lime-300 p-4 font-mono text-sm text-gray-700 outline-none placeholder:text-sm md:max-w-[90%] md:p-6 lg:max-w-[85%] lg:p-8 xl:max-w-[80%]"
              placeholder="Type your answer here..."
            ></textarea>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              className="rounded-lg border-amber-300 bg-pink-400 px-8 py-3 font-mono text-lg text-black shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 hover:bg-pink-500"
              onClick={handleSubmit} // Handle submit using Web3
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
