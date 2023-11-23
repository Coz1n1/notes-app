import { FC, useState, ChangeEvent } from "react";
import { NodeType } from "@/types";
import { AiOutlineCheck } from "react-icons/ai";
import { BsTrash2 } from "react-icons/bs";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { FaPencilAlt } from "react-icons/fa";
import EditInput from "@/components/EditInput";
import { GiConfirmed } from "react-icons/gi";

interface NodeProps {
  data: NodeType;
}

const Note: FC<NodeProps> = ({ data }) => {
  const user = localStorage.getItem("username");
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [date, setDate] = useState(data.date);

  const handleDelete = () => {
    axios
      .post("https://notes-app-production-4a7e.up.railway.app/deleteNote", {
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
      .post("https://notes-app-production-4a7e.up.railway.app/completed", {
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

  const handleEdit = () => {
    axios
      .post("https://notes-app-production-4a7e.up.railway.app/update", {
        id: data.id,
        title: title,
        description: description,
        date: date,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-slate-800 px-6 py-6 rounded-lg w-[250px] h-[220px] md:w-[400px] md:h-[250px]">
      <div className="flex flex-col md:gap-4 h-full justify-between">
        <div>
          {isEditing ? (
            <EditInput
              type="text"
              id="title"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              value={title}
            />
          ) : (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>
        <div className="mt-4">
          {isEditing ? (
            <EditInput
              type="text"
              id="description"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              value={description}
            />
          ) : (
            <p className="text-zinc-500">{description}</p>
          )}
        </div>
        <div className="mt-4 md:mt-12 flex justify-between items-center">
          <div>
            {isEditing ? (
              <EditInput
                type="text"
                id="date"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
                value={date}
              />
            ) : (
              <p className="text-zinc-500 font-bold">{date}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="w-10 h-10 bg-[#e44848] rounded-xl flex items-center justify-center"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <GiConfirmed
                  className="font-bold"
                  size={28}
                  onClick={handleEdit}
                />
              ) : (
                <FaPencilAlt className="font-bold" size={28} />
              )}
            </button>
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
