import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";

const SignUp = ({ setCurrentPage, pricingOption }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const aa = localStorage.getItem("a") || "";
  const tid = localStorage.getItem("tid") || "";
  const aff_sub3 = localStorage.getItem("aff_sub3") || "";

  const handleSignupSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password
    ) {
      const result = await axios.post(
        "https://demoflowmedia-production.up.railway.app/api/user/signup",
        formData
      );

      // console.log("signup response: ", result);
      if (result.status === 201) {
        setLoading(false);
        //navigate the url
        if (pricingOption === 24.66) {
          window.location.href = `https://affshubs.o18a.com/c?o=21820446&m=456&a=${aa}&aff_sub3=${aff_sub3}&tid=${tid}&aff_sub6=${formData?.email}`;
        } else {
          window.location.href = `https://affshubs.o18a.com/c?o=21869158&m=456&a=${aa}&aff_sub3=${aff_sub3}&tid=${tid}&aff_sub6=${formData?.email}`;
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-linear-to-br from-gray-900 via-black to-gray-900 text-white min-h-[calc(100vh-148.5px)]">
      <div className="max-w-lg mx-auto px-4 py-12">
        <button
          onClick={() => setCurrentPage("landing")}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-center mb-8">
            <div className="h-8 flex items-center justify-center">
              <img
                src="/logo.svg"
                alt="Stream Hub Logo"
                className="h-full w-full"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">
            Create your account
          </h2>
          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Must be at least 6 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
            >
              {loading ? "Processing..." : "Next Step"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              By continuing, you agree to Stream hub Terms of Service and
              Privacy Policy
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
