import React from "react";
import Hero from "./Hero";
import Navbar from "../../components/Navbar";
import About from "./About";
import Testimonials from "./Testimonials";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="dark:bg-[#0B0A10] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
