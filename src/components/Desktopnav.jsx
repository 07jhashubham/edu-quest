import { Link } from "react-router-dom";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { PlayArrow } from "@mui/icons-material";

export default function DeskNav() {
  return (
    // <div className="group transition-all duration-200 hidden md:block">
    //   <div className="absolute top-1/2 bg-lime-400 right-0 group-hover:-translate-y-40 transform z-10 rotate-90 origin-right mr-5 flex flex-col items-center">
    //     <div className="mx-10 hidden group-hover:block transform -rotate-90 group-hover:mt-44">
    //       <div className="flex flex-col space-y-2">
    //         <Link
    //           to="/"
    //           className="hover:bg-black px-4 py-2 hover:text-white rounded-md"
    //         >
    //           Home
    //         </Link>
    //         <Link
    //           to="/answer"
    //           className="hover:bg-black px-4 py-2 hover:text-white rounded-md"
    //         >
    //           Answer
    //         </Link>
    //         <Link
    //           to="/ask"
    //           className="hover:bg-black px-4 py-2 hover:text-white rounded-md"
    //         >
    //           Ask
    //         </Link>
    //         <Link
    //           to="/dashboard"
    //           className="hover:bg-black px-4 py-2 hover:text-white rounded-md"
    //         >
    //           Dashboard
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="bg-black text-gray-200 py-2 px-4">
    //       <span className="mr-2">Navigation Links</span>
    //       <span className="ml-2 group-hover:hidden">
    //         <PlayArrow style={{ fontSize: 30, transform: "rotate(90deg)" }} />
    //       </span>
    //       <span className="ml-2 hidden group-hover:inline-block">
    //         <PlayArrow style={{ fontSize: 30, transform: "rotate(-90deg)" }} />
    //       </span>
    //     </div>
    //   </div>
    // </div>
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
      </div>
    </div>
  );
}
