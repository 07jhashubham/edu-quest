import React, { useState } from "react";
import DeskNav from "../components/Desktopnav";
import { useWeb3 } from "../context/context";

export default function Ask() {
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");
  const [willingToPay, setWillingToPay] = useState(0);
  const { postQuestion } = useWeb3();

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.map((option, i) => (i === index ? value : option));
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    postQuestion(question, options, willingToPay);
  };

  return (
    <div>
      <DeskNav />
      <div className="flex w-full my-20 justify-center">
        <div className="mb-10 w-full max-w-[90%] rounded-xl bg-black pb-12 md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]">
          {/* Ask Question Section */}
          <div className="flex items-center justify-center">
            <p className="group relative mt-5 inline-block justify-center border-b-8 border-pink-400 bg-gradient-to-t from-pink-400 to-pink-400 bg-[length:100%_0%] bg-bottom bg-no-repeat px-6 py-3 text-center font-mono text-xl text-pink-400 transition-all duration-[200ms] ease-in-out hover:rounded-lg hover:bg-[length:100%_100%] hover:px-12 hover:text-black md:text-3xl lg:text-4xl">
              <span className="group-hover:hidden">Ask Question</span>
              <span className="hidden group-hover:block">EDU Quest</span>
            </p>
          </div>

          {/* Textarea Section */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <textarea
              id="expanding-textarea"
              className="h-36 w-full max-w-[92%] overflow-y-auto rounded-lg border-none bg-lime-300 p-4 font-mono text-sm text-gray-700 outline-none placeholder:text-sm md:max-w-[90%] md:p-6 lg:max-w-[85%] lg:p-8 xl:max-w-[80%]"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>

          {/* Dynamic Option Inputs */}
          {options.map((option, index) => (
            <div
              key={index}
              className="mt-4 flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-w-[92%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]">
                <input
                  type="text"
                  id={`option-input-${index}`}
                  className="w-full rounded-lg border-none bg-pink-300 p-4 pl-10 font-mono text-sm text-gray-700 placeholder-gray-600 outline-none"
                  placeholder={`Enter option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="absolute right-0 top-0 mt-4 mr-4 text-gray-700 hover:text-red-500"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}

          {/* Options and Image Buttons Section */}
          <div className="max-w-p[92%] mt-4 flex w-full justify-around p-4 text-white md:p-6 lg:p-8">
            <button
              onClick={handleAddOption}
              className="mx-8 rounded-lg border-b-amber-300 border-l-amber-300 bg-pink-400 px-6 py-3 font-mono text-black shadow-lg hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 hover:bg-pink-500"
            >
              Options
            </button>
            <button className="mx-8 rounded-lg border-b-amber-300 border-l-amber-300 bg-pink-400 px-9 py-3 font-mono text-black shadow-lg hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 hover:bg-pink-500">
              Image
            </button>
          </div>

          {/* Willing to Pay Section */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <label
              htmlFor="willing-to-pay"
              className="font-mono text-lg text-white md:text-xl lg:text-2xl"
            >
              Willing to Pay:
            </label>
            <input
              type="number"
              id="willing-to-pay"
              className="no-spinner mt-2 h-10 w-32 rounded-lg border-none bg-lime-300 p-2 text-center font-mono text-gray-700 outline-none placeholder:text-sm"
              placeholder="Amount"
              min="0"
              value={willingToPay}
              onChange={(e) => setWillingToPay(e.target.value)}
            />
          </div>

          {/* Submit Question Button Section */}
          <div className="mt-6 flex items-center justify-center">
            <button
              className="rounded-lg border-amber-300 bg-pink-400 px-8 py-3 font-mono text-lg text-black shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1 hover:border-b-8 hover:border-l-8 hover:bg-pink-500"
              onClick={handleSubmit}
            >
              Submit Question
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        /* Hide default input number arrows */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
