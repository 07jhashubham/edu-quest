// import React, { useState, useEffect } from "react";
// import DeskNav from "../components/Desktopnav";
// import CategoryIcon from "@mui/icons-material/Category";
// import AnswerList from "../components/AnswerList";
// import AnswerPopup from "../components/AnswerPopup";
// import QuestionPopup from "../components/QuestionPopup";
// import answers from "../Data/answers.json";
// import { useWeb3 } from "../context/context";

// export default function AnswerPage() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [sortOption, setSortOption] = useState(null);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);

//   const { getSolvableQuestions, SolvableQuestions, answerQuestion } = useWeb3();

//   const QuestionStatus = {
//     Unanswered: 0,
//     Answered: 1,
//     Pending: 2,
//     Rejected: 3,
//   };

//   const fetchAndFilterQuestions = async () => {
//     await getSolvableQuestions();

//     // Ensure questions are available before filtering
//     if (SolvableQuestions && SolvableQuestions.length > 0) {
//       const questions = SolvableQuestions.filter(
//         (question) => question.status === QuestionStatus.Unanswered
//       );
//       setFilteredQuestions(questions);
//     } else {
//       setFilteredQuestions([]); // No questions available
//     }
//   };

//   useEffect(() => {
//     // Fetch solvable questions once when the component mounts
//     fetchAndFilterQuestions();
//   }, []); // Empty dependency array to ensure this runs only once on mount

//   useEffect(() => {
//     let sortedQuestions = [...filteredQuestions];

//     if (sortOption === "HighToLow") {
//       sortedQuestions = sortedQuestions.sort((a, b) => b.grant - a.grant);
//     } else if (sortOption === "LowToHigh") {
//       sortedQuestions = sortedQuestions.sort((a, b) => a.grant - b.grant);
//     } else if (sortOption === "Earliest") {
//       sortedQuestions = sortedQuestions.sort((a, b) => a.question_id - b.question_id);
//     } else if (sortOption === "Latest") {
//       sortedQuestions = sortedQuestions.sort((a, b) => b.question_id - a.question_id);
//     }

//     setFilteredQuestions(sortedQuestions);
//   }, [sortOption]);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const openPopup = (answer) => {
//     setSelectedAnswer(answer);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedAnswer(null);
//   };

//   const openQuestionPopup = (question) => {
//     setSelectedQuestion(question);
//     setIsQuestionPopupOpen(true);
//   };

//   const closeQuestionPopup = () => {
//     setIsQuestionPopupOpen(false);
//     setSelectedQuestion(null);
//   };

//   const handleSort = (option) => {
//     setSortOption(option);
//     setIsDropdownOpen(false); // Close the dropdown after selection
//   };

//   const handleSubmitAnswer = async (questionId, optionNumber, comment) => {
//     try {
//       await answerQuestion(questionId, optionNumber, comment);
//       closeQuestionPopup();
//       fetchAndFilterQuestions(); // Refetch and update the list after answering
//     } catch (error) {
//       console.error("Failed to submit answer", error);
//     }
//   };

//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === "Escape") {
//         closePopup();
//         closeQuestionPopup();
//       }
//     };
//     window.addEventListener("keydown", handleEsc);

//     return () => {
//       window.removeEventListener("keydown", handleEsc);
//     };
//   }, []);

//   const handleSearchSubmit = (event) => {
//     event.preventDefault(); // Prevent form submission from causing page reload
//     fetchAndFilterQuestions(); // Fetch questions again on search
//   };

//   return (
//     <div>
//       <DeskNav />
//       <div className="flex w-full flex-col items-center justify-center">
//         <div className="flex w-full flex-col items-center justify-center text-white">
//           <form
//             className="mx-8 mb-4 w-[80%] max-w-[800px] rounded-lg px-6 py-4 font-mono"
//             onSubmit={handleSearchSubmit} // Prevent form default behavior
//           >
//             <div className="flex relative">
//               <label
//                 htmlFor="search-dropdown"
//                 className="sr-only text-sm font-medium text-gray-400"
//               >
//                 Search
//               </label>
//               <button
//                 id="dropdown-button"
//                 className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-pink-700 bg-pink-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none"
//                 type="button"
//                 onClick={toggleDropdown}
//               >
//                 <CategoryIcon className="mr-2" />
//                 SORT
//               </button>
//               {isDropdownOpen && (
//                 <div
//                   id="dropdown"
//                   className="absolute left-0 top-full mt-1 w-44 divide-y divide-pink-400 rounded-lg bg-pink-500 shadow dark:bg-pink-700"
//                 >
//                   <ul
//                     className="py-2 text-sm text-white dark:text-white"
//                     aria-labelledby="dropdown-button"
//                   >
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                         onClick={() => handleSort("HighToLow")}
//                       >
//                         High to Low
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                         onClick={() => handleSort("LowToHigh")}
//                       >
//                         Low to High
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                         onClick={() => handleSort("Earliest")}
//                       >
//                         Earliest
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                         onClick={() => handleSort("Latest")}
//                       >
//                         Latest
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//               <div className="relative w-full">
//                 <input
//                   type="search"
//                   id="search-dropdown"
//                   className="block w-full rounded-r-lg border border-pink-700 bg-pink-500 p-4 text-sm text-gray-900 placeholder-white outline-none focus:border-pink-700 focus:ring-pink-700 dark:border-pink-600 dark:bg-pink-500 dark:text-white dark:placeholder-white dark:focus:border-pink-700 dark:focus:ring-pink-700"
//                   placeholder="Search..."
//                   required
//                 />
//                 <button
//                   type="submit" // Make this button submit the form
//                   className="absolute bottom-0 right-0 top-0 h-full rounded-r-lg border border-pink-700 bg-pink-700 px-4 text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//                 >
//                   <svg
//                     className="h-4 w-4"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                     />
//                   </svg>
//                   <span className="sr-only">Search</span>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         <AnswerList
//           answers={answers}
//           openPopup={openPopup}
//           openQuestionPopup={openQuestionPopup} // Pass the openQuestionPopup function
//           filteredQuestions={filteredQuestions} // Pass the filtered questions to AnswerList
//           onSubmitAnswer={handleSubmitAnswer} // Pass the submit answer handler to QuestionPopup
//         />

//         {isPopupOpen && selectedAnswer && (
//           <AnswerPopup answer={selectedAnswer} closePopup={closePopup} />
//         )}

//         {isQuestionPopupOpen && selectedQuestion && (
//           <QuestionPopup
//             question={selectedQuestion}
//             closePopup={closeQuestionPopup}
//             onSubmitAnswer={handleSubmitAnswer} // Handle the answer submission
//           />
//         )}
//       </div>
//     </div>
//   );
// }













import React, { useState, useEffect } from "react";
import DeskNav from "../components/Desktopnav";
import CategoryIcon from "@mui/icons-material/Category";
import AnswerList from "../components/AnswerList";
import AnswerPopup from "../components/AnswerPopup";
import QuestionPopup from "../components/QuestionPopup"; // Import the new QuestionPopup
import answers from "../Data/answers.json";
import { useWeb3 } from "../context/context";

export default function AnswerPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const { getSolvableQuestions, SolvableQuestions } = useWeb3();

  useEffect(() => {
    // Fetch solvable questions when component mounts
    getSolvableQuestions();
  }, []);

  useEffect(() => {
    // Filter out answered questions and sort the list based on the selected sorting option
    let questions = SolvableQuestions.filter(
      (question) => question.status === 0 // Assuming 0 corresponds to Unanswered status
    );

    if (sortOption === "HighToLow") {
      questions = questions.sort((a, b) => b.grant - a.grant);
    } else if (sortOption === "LowToHigh") {
      questions = questions.sort((a, b) => a.grant - b.grant);
    } else if (sortOption === "Earliest") {
      questions = questions.sort((a, b) => a.question_id - b.question_id);
    } else if (sortOption === "Latest") {
      questions = questions.sort((a, b) => b.question_id - a.question_id);
    }

    setFilteredQuestions(questions);
  }, [sortOption, SolvableQuestions]);

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

  const openQuestionPopup = (question) => {
    setSelectedQuestion(question);
    setIsQuestionPopupOpen(true);
  };

  const closeQuestionPopup = () => {
    setIsQuestionPopupOpen(false);
    setSelectedQuestion(null);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closePopup();
        closeQuestionPopup();
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
                SORT
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
                        onClick={() => handleSort("HighToLow")}
                      >
                        High to Low
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
                        onClick={() => handleSort("LowToHigh")}
                      >
                        Low to High
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
                        onClick={() => handleSort("Earliest")}
                      >
                        Earliest
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
                        onClick={() => handleSort("Latest")}
                      >
                        Latest
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
                  onClick={getSolvableQuestions}
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

        <AnswerList
          answers={answers}
          openPopup={openPopup}
          openQuestionPopup={openQuestionPopup} // Pass the openQuestionPopup function
          filteredQuestions={filteredQuestions} // Pass the filtered questions to AnswerList
        />

        {isPopupOpen && selectedAnswer && (
          <AnswerPopup answer={selectedAnswer} closePopup={closePopup} />
        )}

        {isQuestionPopupOpen && selectedQuestion && (
          <QuestionPopup
            question={selectedQuestion}
            closePopup={closeQuestionPopup}
          />
        )}
      </div>
    </div>
  );
}
















// WORKING
// import React, { useState, useEffect } from "react";
// import DeskNav from "../components/Desktopnav";
// import CategoryIcon from "@mui/icons-material/Category";
// import AnswerList from "../components/AnswerList";
// import AnswerPopup from "../components/AnswerPopup";
// import QuestionPopup from "../components/QuestionPopup"; // Import the new QuestionPopup
// import answers from "../Data/answers.json";
// import { useWeb3 } from "../context/context";

// export default function AnswerPage() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);

//   const { getSolvableQuestions } = useWeb3();

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const openPopup = (answer) => {
//     setSelectedAnswer(answer);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedAnswer(null);
//   };

//   const openQuestionPopup = (question) => {
//     setSelectedQuestion(question);
//     setIsQuestionPopupOpen(true);
//   };

//   const closeQuestionPopup = () => {
//     setIsQuestionPopupOpen(false);
//     setSelectedQuestion(null);
//   };

//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === "Escape") {
//         closePopup();
//         closeQuestionPopup();
//       }
//     };
//     window.addEventListener("keydown", handleEsc);

//     return () => {
//       window.removeEventListener("keydown", handleEsc);
//     };
//   }, []);

//   return (
//     <div>
//       <DeskNav />
//       <div className="flex w-full flex-col items-center justify-center">
//         <div className="flex w-full flex-col items-center justify-center text-white">
//           <form className="mx-8 mb-4 w-[80%] max-w-[800px] rounded-lg px-6 py-4 font-mono">
//             <div className="flex relative">
//               <label
//                 htmlFor="search-dropdown"
//                 className="sr-only text-sm font-medium text-gray-400"
//               >
//                 Search
//               </label>
//               <button
//                 id="dropdown-button"
//                 className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-pink-700 bg-pink-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none"
//                 type="button"
//                 onClick={toggleDropdown}
//               >
//                 <CategoryIcon className="mr-2" />
//                 SORT
//               </button>
//               {isDropdownOpen && (
//                 <div
//                   id="dropdown"
//                   className="absolute left-0 top-full mt-1 w-44 divide-y divide-pink-400 rounded-lg bg-pink-500 shadow dark:bg-pink-700"
//                 >
//                   <ul
//                     className="py-2 text-sm text-white dark:text-white"
//                     aria-labelledby="dropdown-button"
//                   >
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                       >
//                         High to Low
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                       >
//                         Low to High
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                       >
//                         Earliest
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         type="button"
//                         className="inline-flex w-full px-4 py-2 hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white"
//                       >
//                         Latest
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//               <div className="relative w-full">
//                 <input
//                   type="search"
//                   id="search-dropdown"
//                   className="block w-full rounded-r-lg border border-pink-700 bg-pink-500 p-4 text-sm text-gray-900 placeholder-white outline-none focus:border-pink-700 focus:ring-pink-700 dark:border-pink-600 dark:bg-pink-500 dark:text-white dark:placeholder-white dark:focus:border-pink-700 dark:focus:ring-pink-700"
//                   placeholder="Search..."
//                   required
//                 />
//                 <button
//                   onClick={getSolvableQuestions}
//                   type="submit"
//                   className="absolute bottom-0 right-0 top-0 h-full rounded-r-lg border border-pink-700 bg-pink-700 px-4 text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//                 >
//                   <svg
//                     className="h-4 w-4"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                     />
//                   </svg>
//                   <span className="sr-only">Search</span>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         <AnswerList
//           answers={answers}
//           openPopup={openPopup}
//           openQuestionPopup={openQuestionPopup} // Pass the openQuestionPopup function
//         />

//         {isPopupOpen && selectedAnswer && (
//           <AnswerPopup answer={selectedAnswer} closePopup={closePopup} />
//         )}

//         {isQuestionPopupOpen && selectedQuestion && (
//           <QuestionPopup
//             question={selectedQuestion}
//             closePopup={closeQuestionPopup}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
