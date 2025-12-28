import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const defaultA = 229014;

    const storeA = params.get("a");
    const urlAff = params.get("aff_sub3");
    const tid = params.get("tid");
    // Case 1: URL has "a" and "aff_sub3"
    if (storeA) {
      localStorage.setItem("a", storeA);
    } else if (!localStorage.getItem("a")) {
      // Case 2: no URL "a" and nothing stored yet — set default
      localStorage.setItem("a", defaultA);
    }

    if (tid) {
      localStorage.setItem("tid", tid);
    }

    //Case 3: Only save aff_sub3 if provided in URL
    if (urlAff) {
      localStorage.setItem("aff_sub3", urlAff);
    }
  }, [location.search]);

  return (
    <section >
      <Navbar />
      <main className="min-h-[calc(100vh-148.5px)]">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default MainLayout;
