import React from "react";
import { Link, useLocation } from "react-router";

const Footer = () => {
  const pathname = useLocation().pathname;

  if (pathname === "/login" || pathname === "/dashboard") {
    return null;
  }

  return (
    <footer className="bg-black py-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs text-gray-500 text-center leading-relaxed uppercase">
          Copyright © 2025 Stream Hub{" "}
          <Link
            to={"https://streamshub.fun/terms-and-condition"}
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            TERMS AND CONDITIONS
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
