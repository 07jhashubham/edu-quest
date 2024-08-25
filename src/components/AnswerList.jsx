import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";

export default function AnswerList({ answers, openPopup }) {
  return (
    <div className="max-w-[1600px] pt-4">
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
            {/* Conditionally render the StarIcon and id if options exist */}

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
        </div>
      ))}
    </div>
  );
}
