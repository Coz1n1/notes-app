import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";

const Y_OFFSET = 70;

const Navbar = () => {
  const navigate = useNavigate();
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= Y_OFFSET) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-screen flex justify-between px-2 sm:px-12 md:px-24 py-6 fixed z-50 transition duration-300 ${
        showBg ? "dark:bg-[#0B0A10]" : "bg-slate-800/60"
      } `}
    >
      <div className="flex items-center justify-center">
        <span className="text-3xl font-bold text-[#e44848]">GoodNotes</span>
      </div>
      <div className="flex items-center justify-center gap-8">
        <ModeToggle />
        <button
          className="bg-[#6CBF0D] px-4 py-2 text-white font-bold rounded-lg text-xl"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
