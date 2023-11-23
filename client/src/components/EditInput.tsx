import { ChangeEvent, FC } from "react";

interface EditInputProps {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const EditInput: FC<EditInputProps> = ({ id, onChange, value, type }) => {
  return (
    <div className="w-full">
      <input
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        className="w-full px-4 bg-[#0B0A10]/50 text-md rounded-md text-white py-2 focus:outline-none"
      />
    </div>
  );
};

export default EditInput;
