import React, { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SignIn";

const Home = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [pricingOption, setPricingOption] = useState(null);

  const handlePlanSelect = (plan) => {
    setPricingOption(plan);
    setCurrentPage("signup");
    window.scrollTo(0, 0);
  };

  if (currentPage === "landing") {
    return (
      <section id="signin">
        <div className="relative overflow-hidden text-white min-h-[calc(100vh-148.5px)] flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black"></div>
            <img
              src="https://lh3.googleusercontent.com/HZ7rBsFLACC4T7MwfKdFPcbUBW5ZGnsyxAi4YNV53OBkPw1DokcZdjaP6rwVMl7QlVuqERTqdoovxX3HSMDXC-z550SiAS8HhyHa4rIbc6IycIi62-8"
              alt="NFL Action"
              className="w-full h-full object-cover brightness-40"
            />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl lg:text-4xl font-bold  md:mb-6 animate-fade-in">
              Stream NFL Match at lower prices!
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-12 text-gray-200">
              Stream Nfl,Nba,Nhl + Other Games at Low Price!
            </p>

            <div className="grid grid-cols-2 space-x-2 md:gap-6 max-w-4xl w-full">
              <div className="bg-black/80 backdrop-blur-md rounded-2xl px-3 py-6  md:px-8 md:py-8 border border-gray-800 hover:border-blue-500 transition-all transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-center mb-2 md:mb-4">
                  <div className="bg-green-700 text-white px-2 md:px-4 py-1 rounded-full text-[10px] md:text-xs lg:text-sm md:font-semibold">
                    NFL STREAM + Other Games
                  </div>
                </div>
                <p className="text-gray-300 mb-2 md:mb-6 text-sm lg:text-base">
                  Stream NFL Season + Other Games
                </p>
                <div className=" mb-2 md:mb-6">
                  <span className="text-2xl md:text-3xl lg:text-5xl font-bold">
                    $24.66
                  </span>
                  <span className=" text-xl md:text-2xl align-top">*</span>
                </div>
                <p className="text-sm md:text-base text-gray-400 mb-2 md:mb-6">
                  Monthly/30days
                </p>
                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-8">
                  No Auto change No Auto renew
                </p>
                <button
                  onClick={() => handlePlanSelect(24.66)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 rounded-full transition transform hover:scale-105 text-xs md:text-sm lg:text-base"
                >
                  Get Both Now
                </button>
              </div>

              <div className="bg-black/80 backdrop-blur-md rounded-2xl px-3 py-6  md:px-8 md:py-8 border border-gray-800 hover:border-blue-500 transition-all transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-center mb-2 md:mb-4">
                  <div className="bg-green-700 text-white px-2 md:px-4 py-1 rounded-full text-[10px] md:text-xs lg:text-sm md:font-semibold">
                    NFL STREAM + Other Games
                  </div>
                </div>
                <p className="text-gray-300 mb-2 md:mb-6 text-sm lg:text-base">
                  Stream NFL Season + Other Games
                </p>
                <div className=" mb-2 md:mb-6">
                  <span className="text-2xl md:text-3xl lg:text-5xl font-bold">
                    $15.99
                  </span>
                  <span className=" text-xl md:text-2xl align-top">*</span>
                </div>
                <p className="text-sm md:text-base text-gray-400 mb-2 md:mb-6">
                  2 weeks /15days
                </p>
                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-8">
                  No Auto change No Auto renew
                </p>
                <button
                  onClick={() => handlePlanSelect(15.99)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 rounded-full transition transform hover:scale-105 text-xs md:text-sm lg:text-base"
                >
                  Get Both Now
                </button>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage("signin")}
              className="mt-12 text-white font-semibold underline hover:text-gray-300 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (currentPage === "signup") {
    return (
      <SignUp setCurrentPage={setCurrentPage} pricingOption={pricingOption} />
    );
  }

  if (currentPage === "signin") {
    return <SignIn setCurrentPage={setCurrentPage} />;
  }
};

export default Home;
