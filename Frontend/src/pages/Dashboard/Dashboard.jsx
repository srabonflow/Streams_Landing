import React from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import Landingpage from "../../components/LandingPage/Landingpage";
import HeroSectionManager from "../../components/HeroSectionManager/HeroSectionManager";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto bg-white  shadow p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            Logged in as:{" "}
            <span className="font-semibold">{user?.username}</span>
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
      {/* body landing page */}
      <div>
        <HeroSectionManager />
        {/* <Landingpage /> */}
      </div>
    </div>
  );
};

export default Dashboard;
