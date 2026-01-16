import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams } from "react-router";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

const HeroLandingBySlug = () => {
  const { slug } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pricingOption, setPricingOption] = useState(null);
  const [currentPage, setCurrentPage] = useState("landing");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErrMsg("");

        const res = await api.get(`/hero/landing/${slug}`);
        setHero(res.data);
      } catch (e) {
        setErrMsg(e?.response?.data?.message || "Hero not found");
        setHero(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const handlePlanSelect = (plan) => {
    setPricingOption(plan);
    setCurrentPage("signup");
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-148.5px)] bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          <p className="text-white mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (errMsg) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-148.5px)] bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-6xl font-bold text-gray-900 mb-4">404</h2>
          <p className="text-gray-600 text-lg">{errMsg}</p>
        </div>
      </div>
    );
  }

  // console.log(hero);

  if (currentPage === "landing") {
    return (
      <div className="relative min-h-[calc(100vh-148.5px)] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${hero.imageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold  md:mb-6 animate-fade-in text-white">
            {hero?.title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-12 text-gray-200">
             {hero?.subtitle}
          </p>

          <div className="grid grid-cols-2 space-x-2 md:gap-6 max-w-4xl w-full">
            {(hero?.cards || []).slice(0, 2).map((card, idx) => (
              <div
                key={idx}
                className="bg-black/80 backdrop-blur-md rounded-2xl px-3 py-6 md:px-8 md:py-8 border border-gray-800 hover:border-blue-500 transition-all transform hover:scale-105 hover:shadow-2xl w-full"
              >
                <div className="flex items-center justify-center mb-2 md:mb-4">
                  <div className="bg-green-700 text-white px-2 md:px-4 py-1 rounded-full text-[10px] md:text-xs lg:text-sm md:font-semibold">
                    {card.badge}
                  </div>
                </div>

                <p className="text-gray-300 mb-2 md:mb-6 text-sm lg:text-base text-center">
                  {card.description}
                </p>

                <div className="mb-2 md:mb-6 text-center">
                  <span className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">
                    {card.price ? `$${card.price}` : ""}
                  </span>
                  <span className="text-xl md:text-2xl align-top">*</span>
                </div>

                <p className="text-sm md:text-base text-gray-400 mb-2 md:mb-6 text-center">
                  {card.duration}
                </p>

                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-8 text-center">
                  {card.note}
                </p>

                <button
                  onClick={() => handlePlanSelect(Number(card.price || 0))}
                  disabled={!card.price}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 rounded-full transition transform hover:scale-105 text-xs md:text-sm lg:text-base disabled:opacity-50"
                >
                  {card.ctaText || "Get Both Now"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-900/30 via-transparent to-transparent pointer-events-none"></div>
      </div>
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

export default HeroLandingBySlug;
