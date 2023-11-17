import React, { useState, ChangeEvent, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Note from "./Note";
import { NodeType } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "./Navigation";
import AddInput from "@/components/AddInput";

const GoodNotes = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const user = localStorage.getItem("username");
  const [userNotes, setUserNotes] = useState<[]>();
  const [userCompletedNotes, setUserCompletedNotes] = useState<[]>();
  const [filterTitle, setFilterTitle] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    axios
      .post("http://localhost:3002/notes", {
        username: user,
      })
      .then((response) => {
        setUserNotes(response.data.rows);
      });

    return () => {};
  }, [userNotes]);

  useEffect(() => {
    axios
      .post("http://localhost:3002/completedAll", {
        username: user,
      })
      .then((response) => {
        setUserCompletedNotes(response.data.rows);
      });

    return () => {};
  }, [userCompletedNotes]);

  const handleAdd = () => {
    if (title != "" && description != "") {
      axios
        .post("http://localhost:3002/add", {
          username: user,
          title: title,
          description: description,
          date: date,
        })
        .then(() => {
          setShowAddMenu(!showAddMenu);
          setTitle("");
          setDescription("");
          setDate("");
          toast({
            title: "Info",
            description: "Note added :)",
          });
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    } else {
      toast({
        title: "Info",
        description: "Please fill in all inputs",
      });
    }
  };

  const filteredNotes = userNotes?.filter((note: any) => {
    return note.title.toLowerCase().includes(filterTitle);
  });

  return (
    <div className="h-screen flex overflow-hidden">
      <Navigation notes={userNotes} completedNotes={userCompletedNotes} />
      <main className="flex-1 h-full px-8 mt-4 flex flex-col overflow-y-auto">
        <div className="w-full text-left my-2 text-3xl font-bold">
          <h1>All Notes</h1>
        </div>
        <div className="">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="px-4 py-2 rounded-lg bg-[#6CBF0D] font-bold hover:shadow-[#6CBF0D]/50 hover:shadow-md"
          >
            Add Note
          </button>
        </div>
        <div className="mt-8 w-full flex flex-col border-t-2 border-[#D36F48]">
          <div className="w-full text-center mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg px-4 py-2 relative bg-slate-800/50"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFilterTitle(e.target.value)
              }
              value={filterTitle}
            />
          </div>
          <div className="mt-4 gap-8 flex flex-wrap flex-col items-center justify-center sm:flex-row mb-8">
            {filteredNotes ? (
              <>
                {filteredNotes?.map((note: NodeType, i) => (
                  <Note data={note} key={i} />
                ))}
              </>
            ) : (
              <>
                <div className="flex flex-col mt-8 text-center">
                  <img
                    src="./imgs/empty.png"
                    alt="empty"
                    className="w-[200px]"
                  />
                  <h1 className="text-muted-foreground">No notes yet :(</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <div
        className={`${
          showAddMenu ? "fixed" : "hidden"
        } w-screen h-screen z-[99999] flex items-center justify-center bg-slate-800/60`}
      >
        <div className="w-[330px] md:w-[600px] bg-slate-800 px-4 py-4 md:py-8 rounded-lg flex flex-col shadow-black shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Add Note</h1>
            <AiOutlineClose
              size={28}
              className="cursor-pointer"
              onClick={() => setShowAddMenu(!showAddMenu)}
            />
          </div>
          <AddInput
            title="Title"
            type="text"
            id="title"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
          <AddInput
            title="Description"
            type="text"
            id="description"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            value={description}
          />
          <AddInput
            title="Date"
            type="text"
            id="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
            value={date}
          />
          <div className="w-full flex justify-end mt-8">
            <button
              onClick={handleAdd}
              className="px-4 py-2 font-bold bg-[#6CBF0D] rounded-lg"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default GoodNotes;
