import { FC, ChangeEvent } from "react";

interface InputProps {
  name: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const Input: FC<InputProps> = ({ name, id, onChange, value, type }) => {
  return (
    <div className="relative w-full mt-6 flex items-center justify-center px-4">
      <input
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        className="w-[450px] px-4 bg-neutral-700 text-md rounded-md text-white pt-6 pb-2 focus:ring-0 peer focus:outline-none"
      />
      <label
        htmlFor={id}
        className="absolute text-md text-[#D36F48] duration-300 transform -translate-y-3 scale-90 left-6 px-4 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {name}
      </label>
    </div>
  );
};

export default Input;
