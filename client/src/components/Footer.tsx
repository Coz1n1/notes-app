import { GrMail, GrLinkedin, GrGithub } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="flex w-full justify-between h-[200px] bg-slate-800/30">
      <div className="px-4 md:px-16 flex items-center justify-center h-full">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e44848]">
          GoodNotes
        </span>
      </div>
      <div className="px-2 md:px-16 flex items-center justify-center h-full flex-col gap-4">
        <a
          href="mailto:kacpertokajj@gmail.com"
          target="#blank"
          className="flex items-center justify-center gap-2 text-md md:text-lg text-[#D36F48]"
        >
          <GrMail size={32} />
          kacpertokajj@gmail.com
        </a>
        <div className="flex items-center justify-center gap-2 text-lg text-[#D36F48]">
          <a href="https://www.linkedin.com/in/kacper-tokaj/" target="#blank">
            <GrLinkedin size={32} className="cursor-poiner" />
          </a>
          <a href="https://github.com/Coz1n1" target="#blank">
            <GrGithub size={32} className="cursor-poiner" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
