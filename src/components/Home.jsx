import React, { Suspense } from "react";
import { Link } from "react-router-dom";

const ThreeScene = React.lazy(() => import("../ThreeScene"));

export default function Home() {
  return (
    <div className="">
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
      <div className="flex items-center justify-between mx-8">
        <div className="text-white text-4xl">Hello s</div>
        <div className="flex-shrink-0">
          <Suspense fallback={<div>Loading scene...</div>}>
            <ThreeScene />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
