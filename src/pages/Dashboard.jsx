import React, { useEffect } from "react";
import { minidenticon } from "minidenticons";
import DeskNav from "../components/Desktopnav";
import { useWeb3 } from "../context/context";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const username = "joel-nupurx"; // This can be any unique string
  const identiconSvg = minidenticon(username); // Generate the identicon SVG
  const { shortenAddress, account , user_quest , user_ans } = useWeb3();

  return (
    <div>
      <DeskNav />
      <div className="flex w-full my-20 justify-center">
        <div className="mb-10 w-full max-w-[90%] rounded-xl bg-black pb-12 md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]">
          <div className="flex items-center justify-center">
            <p className="group relative mt-5 inline-block justify-center border-b-8 border-pink-400 bg-gradient-to-t from-pink-400 to-pink-400 bg-[length:100%_0%] bg-bottom bg-no-repeat px-6 py-3 text-center font-mono text-xl text-pink-400 transition-all duration-[200ms] ease-in-out hover:rounded-lg hover:bg-[length:100%_100%] hover:px-12 hover:text-black md:text-3xl lg:text-4xl">
              <span className="group-hover:hidden">Account</span>
              <span className="hidden group-hover:block">EDU Quest</span>
            </p>
          </div>
          <div className="flex mt-10 items-start justify-center">
            {/* Profile Picture */}
            <div className="flex flex-col items-center w-1/4">
              <div
                dangerouslySetInnerHTML={{ __html: identiconSvg }}
                className="w-24 h-24 rounded-full border-4 border-pink-400"
              />
            </div>

            {/* Vertical Divider */}
            <div className="border-l-4 border-pink-400 h-full mx-8"></div>

            {/* User Information */}
            <div className="flex flex-col w-3/4 space-y-4 text-pink-400">
              <div className="text-2xl font-bold">{username}</div>
              <div className="text-lg text-gray-300">
                {account}{" "}
                <Link>
                  {" "}
                  <span
                    onClick={() => {
                      if (account) {
                        navigator.clipboard.writeText(account);
                        toast.success("Account Copied Successfully!");
                      }
                    }}
                    className="text-gray-500"
                  >
                    📋
                  </span>{" "}
                  {/* Copy symbol */}
                </Link>
              </div>
              <div className="text-lg font-bold mt-8">Recent History</div>
              <div className="flex flex-row space-x-4">
                <div>
                  <p className="mb-2" >Asked_Questions</p>{" "}
                  <ul className="text-gray-300 space-y-2 h-32 overflow-y-auto custom-scrollbar">
                    {(user_quest.length <= 0)? (<li>Pleas Connect Wallet</li>):(
                      <>
                      {user_quest.map((quest)=>(
                        <li>
                           {quest.toNumber()}
                        </li>
                      ))}
                      </>
                     
                    )}
                    {/* Add more list items here if needed */}
                  </ul>
                </div>
                <div>
                  <p className="mb-2">Answered_Questions</p>
                  <ul className="text-gray-300 space-y-2 h-32 overflow-y-auto custom-scrollbar">
                  {(user_ans.length <= 0)? (<li>Please Connect Wallet</li>):(
                      <>
                      {user_ans.map((ans)=>(
                        <li>
                           {ans.toNumber()}
                        </li>
                      ))}
                      </>
                     
                    )}
                    {/* Add more list items here if needed */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
