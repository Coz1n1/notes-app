import React from "react";
import { BsPen } from "react-icons/bs";
import { BiNote, BiTask } from "react-icons/bi";

const About = () => {
  return (
    <div className="w-screen pb-8 md:py-16" id="about">
      <div className="flex flex-wrap items-center justify-center w-full gap-8">
        <div className="flex flex-col w-[170px] h-[200px] md:w-[250px] md:h-[200px] lg:w-[300px] lg:h-[220px] bg-slate-800/30 rounded-lg px-4 py-4">
          <div className="flex items-center justify-start gap-4 w-full">
            <div className="bg-[#e44848]/10 w-12 h-12 flex items-center justify-center rounded-full">
              <BiNote size={24} className="text-[#e44848]" />
            </div>
            <span className="font-bold text-md md:text-xl">Notes</span>
          </div>
          <div className="mt-4 text-md md:text-lg">
            <p className="text-zinc-400">
              Make notes and store them in your own databse.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[170px] h-[200px] md:w-[270px] md:h-[230px] lg:w-[340px] lg:h-[270px] bg-slate-800/30 rounded-lg px-4 py-4">
          <div className="flex items-center justify-start gap-4 w-full">
            <div className="bg-[#e44848]/10 w-12 h-12 flex items-center justify-center rounded-full">
              <BsPen size={24} className="text-[#e44848]" />
            </div>
            <span className="font-bold text-md md:text-xl">
              Edit Everything
            </span>
          </div>
          <div className="mt-4 text-lg">
            <p className="text-zinc-400">
              You can edit every element of the note with one click.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[170px] h-[200px] md:w-[250px] md:h-[200px] lg:w-[300px] lg:h-[220px] bg-slate-800/30 rounded-lg px-4 py-4">
          <div className="flex items-center justify-start gap-4 w-full">
            <div className="bg-[#e44848]/10 w-12 h-12 flex items-center justify-center rounded-full">
              <BiTask size={24} className="text-[#e44848]" />
            </div>
            <span className="font-bold text-md md:text-xl">Tasks</span>
          </div>
          <div className="mt-4 text-lg">
            <p className="text-zinc-400">
              Set your actual task and mark it's status after finishing it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
