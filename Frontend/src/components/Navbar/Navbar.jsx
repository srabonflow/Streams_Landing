import { Link, useLocation } from "react-router";

const Navbar = () => {
  const pathname = useLocation().pathname;

  if (pathname === "/login" || pathname === "/dashboard") {
    return null;
  }

  return (
    <nav className={`w-full transition-all duration-300 bg-gray-950`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-200">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Link to={"/"}>
                <img
                  src="/logo.svg"
                  alt="Stream Hub Logo"
                  className="h-10 md:h-14 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex space-x-6 text-sm text-gray-200">
              {/* <Link to="#" className="hover:text-gray-300 transition">
                Features
              </Link> */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <span className="text-sm hidden lg:inline text-gray-200">
              Call +1 833-389-2054 or chat now
            </span> */}
            {/* <Link to={'#signin'} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 text-sm lg:text-base">
              Sign In
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
