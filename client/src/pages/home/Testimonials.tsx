import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const testimonials = [
  {
    id: 1,
    name: "Bat123",
    phrase:
      "Using the application is intuitive and simple. Everything what I was looking for in one place. The best thing is that the application is completely free",
    color: "#e44848",
    img: "/imgs/batman.png",
    date: "02-03-2023",
  },
  {
    id: 2,
    name: "Student",
    phrase:
      "Using the application is intuitive and simple. Everything what I was looking for in one place. The best thing is that the application is completely free",
    color: "#D36F48",
    img: "/imgs/student.png",
    date: "07-07-2023",
  },
  {
    id: 3,
    name: "GoodAlien",
    phrase:
      "Using the application is intuitive and simple. Everything what I was looking for in one place. The best thing is that the application is completely free",
    color: "#6CBF0D",
    img: "/imgs/ufo.png",
    date: "01-04-2023",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === testimonials.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="w-screen mb-24 flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Our <span className="text-[#6CBF0D]"> high quality</span> is confirmed
        by <span className="text-[#e44848]"> customer</span> opinions
      </h1>
      <div className="w-[400px] h-[300px] md:w-[620px] md:h-[220px] lg:w-[850px] lg:h-[270px] relative">
        <div
          className={`absolute top-0 left-0 w-[380px] h-[280px] md:w-[600px] md:h-[200px] lg:w-[840px] bg-[${testimonials[currentIndex].color}] lg:h-[260px] z-10 transition-all duration-300 hover:scale-110 cursor-pointer`}
        >
          <div className="w-full flex flex-col items-center justify-center h-full px-2 sm:px-8 sm:py-4 gap-2 md:gap-4">
            <div className="flex item-center justify-start w-full gap-2">
              <img
                src={testimonials[currentIndex].img}
                alt="avatar"
                className="w-8 h-8"
              />
              <h1 className="font-bold text-xl">
                {testimonials[currentIndex].name}
              </h1>
            </div>
            <p className="text-white text-lg font-bold px-8">
              "{testimonials[currentIndex].phrase}"
            </p>
            <div className="w-full flex items-center justify-end px-8">
              <div className="flex gap-2">
                <span className="text-zinc-500 text-lg font-bold">
                  ,on {testimonials[currentIndex].date}
                </span>
                {[...Array(5)].map((e, i) => {
                  return (
                    <AiFillStar size={32} className="text-yellow-500" key={i} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-[380px] h-[280px] md:w-[600px] md:h-[200px] lg:w-[840px] bg-zinc-800 lg:h-[260px]"></div>
      </div>
    </div>
  );
};

export default Testimonials;
