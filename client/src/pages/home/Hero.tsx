import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex px-4 sm:px-8 md:px-12 2xl:px-32">
      <div className="flex flex-col items-start justify-center text-left gap-y-8 flex-1">
        <span className="text-lg rounded-3xl shadow-xl animate-bounce px-4 py-2 bg-white dark:text-black font-bold">
          We are GoodNotes.
        </span>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl dark:text-white text-black font-bold">
            <span className="text-[#e44848]"> Everything</span> what you need in
            one place. Notes, Daily Tasks & ideas.
          </h1>
          <p className="text-xl font-medium dark:text-white text-black">
            We share with you our workspace where you are doing everything
            faster and better than in normal app.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="#about">
            <button className="flex items-center justify-center bg-[#e44848] px-4 py-2 font-bold text-lg rounded-lg transition-all duration-200 hover:rotate-6 hover:scale-105 hover:shadow-2xl hover:shadow-[#e44848]/50">
              How it works?
            </button>
          </a>
          <button
            className="flex items-center justify-center text-left font-bold text-lg text-white bg-[#6CBF0D] px-4 py-2 rounded-lg gap-2 transition-all duration-200 hover:rotate-6 hover:scale-105 hover:shadow-2xl hover:shadow-[#6CBF0D]/50"
            onClick={() => navigate("/login")}
          >
            Join Us
            <AiOutlineArrowRight size={24} />
          </button>
        </div>
      </div>
      <div className="hidden lg:flex lg:scale-90 xl:scale-100 items-center justify-center text-center flex-1 gap-2">
        <div className="md:w-[100px] md:h-[500px] flex flex-col justify-between">
          <div className="w-full rounded-xl bg-slate-800 h-[150px]"></div>
          <div className="w-full rounded-xl h-[250px] bg-slate-800"></div>
        </div>
        <div className="md:w-[400px] md:h-[500px] flex flex-col  gap-2">
          <div className="flex justify-between gap-2 md:h-[300px]">
            <div className="bg-[#D36F48] w-[250px] h-[300px] rounded-xl"></div>
            <div className="flex flex-col h-full justify-between">
              <div className="w-[150px] h-[110px] bg-[#6CBF0D] rounded-xl"></div>
              <div className="w-[150px] h-[80px] bg-[#e44848] rounded-xl"></div>
              <div className="w-[150px] h-[90px] bg-slate-800 rounded-xl"></div>
            </div>
          </div>
          <div className="h-[160px] w-[400px] flex justify-between">
            <div className="w-[150px] h-[160px] bg-[#e44848] rounded-xl"></div>
            <div className="w-[240px] h-[160px] bg-white rounded-xl"></div>
          </div>
          <div className="w-[400px] h-full bg-[#102A0A] rounded-xl"></div>
        </div>
        <div className="w-[40px] h-[500px] flex items-end">
          <div className="w-full h-[330px] rounded-xl bg-[#D36F48]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
