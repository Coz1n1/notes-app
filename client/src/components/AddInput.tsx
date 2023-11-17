import { ChangeEvent, FC } from "react";

interface AddInputProps {
  title: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const AddInput: FC<AddInputProps> = ({ title, id, onChange, value, type }) => {
  return (
    <div className="w-full mt-2 md:mt-8 flex flex-col gap-2">
      <h1 className="text-lg font-bold">{title}</h1>
      <input
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        className="w-full px-4 bg-[#0B0A10]/50 text-md rounded-md text-white py-2 md:py-4 focus:outline-none"
      />
    </div>
  );
};

export default AddInput;
