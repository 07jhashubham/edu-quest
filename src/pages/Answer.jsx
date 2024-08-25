import React, { useState, useEffect } from "react";
import DeskNav from "../components/Desktopnav";
import CategoryIcon from "@mui/icons-material/Category";
import AnswerList from "../components/AnswerList";
import AnswerPopup from "../components/AnswerPopup";
import answers from "../Data/answers.json";

// Your answers data...

export default function AnswerPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openPopup = (answer) => {
    setSelectedAnswer(answer);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div>
      <DeskNav />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center text-white">
          <form className="mx-8 mb-4 w-[80%] max-w-[800px] rounded-lg px-6 py-4 font-mono">
            <div className="flex relative">
              <label
                htmlFor="search-dropdown"
                className="sr-only text-sm font-medium text-gray-400"
              >
                Search
              </label>
              <button
                id="dropdown-button"
                className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-pink-700 bg-pink-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none"
                type="button"
                onClick={toggleDropdown}
              >
                <CategoryIcon className="mr-2" />
                All categories
              </button>
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="absolute left-0 top-full mt-1 w-44 divide-y divide-pink-400 rounded-lg bg-pink-500 shadow dark:bg-pink-700"
                >
                  <ul
                    className="py-2 text-sm text-white dark:text-white"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
                      >
                        Mockups
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
                      >
                        Templates
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
                      >
                        Design
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
                      >
                        Logos
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block w-full rounded-r-lg border border-pink-700 bg-pink-500 p-4 text-sm text-gray-900 placeholder-white outline-none focus:border-pink-700 focus:ring-pink-700 dark:border-pink-600 dark:bg-pink-500 dark:text-white dark:placeholder-white dark:focus:border-pink-700 dark:focus:ring-pink-700"
                  placeholder="Search..."
                  required
                />
                <button
                  type="submit"
                  className="absolute bottom-0 right-0 top-0 h-full rounded-r-lg border border-pink-700 bg-pink-700 px-4 text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                >
                  <svg
                    className="h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <AnswerList answers={answers} openPopup={openPopup} />

        {isPopupOpen && selectedAnswer && (
          <AnswerPopup answer={selectedAnswer} closePopup={closePopup} />
        )}
      </div>
    </div>
  );
}
