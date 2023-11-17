import React, { FC, useState } from "react";
import { NodeType } from "@/types";
import { AiOutlineCheck } from "react-icons/ai";
import { BsTrash2 } from "react-icons/bs";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface NodeProps {
  data: NodeType;
}

const Note: FC<NodeProps> = ({ data }) => {
  const user = localStorage.getItem("username");
  const { toast } = useToast();

  const handleDelete = () => {
    axios
      .post("http://localhost:3002/deleteNote", {
        username: user,
        title: data.title,
      })
      .then(() => {
        toast({
          title: "Info",
          description: "Note deleted",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComplete = () => {
    axios
      .post("http://localhost:3002/completed", {
        username: user,
        title: data.title,
        description: data.description,
        date: data.date,
      })
      .then(() => {
        toast({
          title: "Info",
          description: "Note Added To Completed",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-slate-800 px-6 py-6 rounded-lg w-[250px] h-[220px] md:w-[400px] md:h-[250px]">
      <div className="flex flex-col md:gap-4 h-full justify-between">
        <div>
          <h1 className="text-xl font-bold">{data.title}</h1>
        </div>
        <div className="mt-4">
          <p className="text-zinc-500">{data.description}</p>
        </div>
        <div className="mt-4 md:mt-12 flex justify-between items-center">
          <div>
            <p className="text-zinc-500 font-bold">{data.date}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="w-10 h-10 bg-[#6CBF0D] rounded-xl flex items-center justify-center"
              onClick={handleComplete}
            >
              <AiOutlineCheck className="font-bold" size={28} />
            </button>
            <button
              className="w-10 h-10 bg-[#D36F48] rounded-xl flex items-center justify-center"
              onClick={handleDelete}
            >
              <BsTrash2 className="font-bold" size={28} />
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Note;
