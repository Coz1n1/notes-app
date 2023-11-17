import { cn } from "@/lib/utils";
import React, { useRef, ElementRef, useState, useEffect, FC } from "react";
import { useMediaQuery } from "usehooks-ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineMenu } from "react-icons/ai";
import { BiChevronDown, BiExit } from "react-icons/bi";
import { GrRefresh } from "react-icons/gr";

interface NavigationProps {
  notes?: [];
  completedNotes?: [];
}

const Navigation: FC<NavigationProps> = ({ notes, completedNotes }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const resizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isActive, setIsActive] = useState(false);
  const [isNoteActive, setIsNoteActive] = useState(false);
  const user = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    resizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navRef.current.style.setProperty("left", `${newWidth}px`);
      navRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    resizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleClick = () => {
    setIsNoteActive(!isNoteActive);
  };

  const handleRestore = (
    noteUser: string,
    noteTitle: string,
    noteDescription: string,
    noteDate: string
  ) => {
    axios
      .post("http://localhost:3002/restore", {
        username: noteUser,
        title: noteTitle,
        description: noteDescription,
        date: noteDate,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetWidth = () => {
    if (sidebarRef.current && navRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navRef.current.style.setProperty("width", "100%");
      navRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full relative flex flex-col overflow-y-auto dark:bg-slate-800 w-60 z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <h1 className="px-2 mt-4 text-2xl text-[#e44848] font-bold">
            GoodNotes
          </h1>
          <button
            className={cn(
              `h-6 w-6 mt-4 bg-slate-500/30 mr-2 rounded-lg opacity-0 group-hover/sidebar:opacity-100 transition`,
              isMobile && "opacity-100"
            )}
            onClick={collapse}
          >
            <AiOutlineDoubleLeft size={22} />
          </button>
        </div>
        <div className="px-2">
          <div className="flex items-center px-2 py-2 mb-8 mt-4 gap-4 bg-slate-500/30 w-full rounded-lg cursor-pointer">
            <div className="bg-slate-800 px-2 py-2 rounded-full">
              <img src="./imgs/icon.png" alt="" className="w-12 h-12" />
            </div>
            <h1 className="text-xl text-[#D36F48] font-bold">{user}</h1>
          </div>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full right-0 top-0 w-1 bg-[#D36F48]"
        />
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col">
            <div className="w-full px-2 mt-4">
              <button
                onClick={handleClick}
                className={`${
                  isNoteActive ? "bg-[#6CBF0D]" : "bg-slate-500/30"
                }  w-full flex justify-between items-center px-4 py-2 rounded-lg font-bold`}
              >
                My Notes
                <BiChevronDown size={22} />
              </button>
              <div
                className={`${
                  isNoteActive
                    ? "opacity-100 transition-all duration-200 h-auto"
                    : "opacity-0 max-h-0 overflow-hidden transition-all duration-200"
                } w-full border-lg`}
              >
                {notes?.map((e: any, i) => (
                  <button
                    key={i}
                    className={`w-full flex justify-between items-center px-4 py-2 rounded-lg font-bold bg-[#e44848] hover:bg-[#e44848]/20 mt-1`}
                  >
                    {e.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full px-2 mt-2">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`${
                  isActive ? "bg-[#6CBF0D]" : "bg-slate-500/30"
                }  w-full flex justify-between items-center px-4 py-2 rounded-lg font-bold`}
              >
                Completed - {completedNotes?.length}
              </button>
              <div
                className={`${
                  isActive
                    ? "opacity-100 transition-all duration-200 h-auto"
                    : "opacity-0 max-h-0 overflow-hidden transition-all duration-200"
                } w-full border-lg`}
              >
                {completedNotes?.map((e: any, i) => (
                  <button
                    onClick={() =>
                      handleRestore(e.username, e.title, e.description, e.date)
                    }
                    key={i}
                    className={`w-full flex justify-between items-center px-4 py-2 rounded-lg font-bold bg-[#e44848] hover:bg-[#e44848]/20 mt-1`}
                  >
                    {e.title}
                    <GrRefresh size={22} className="text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="w-full px-2 mb-2">
              <button
                onClick={handleLogout}
                className="w-full bg-slate-500/30 hover:bg-[#e44848] flex justify-between items-center px-4 py-2 rounded-lg font-bold "
              >
                Sign Out
                <BiExit size={22} />
              </button>
            </div>
          </div>
        </div>
      </aside>
      <div
        ref={navRef}
        className={cn(
          "absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-1 py-2 w-full">
          {isCollapsed && (
            <AiOutlineMenu
              className="h-6 w-6 text-muted-foreground"
              onClick={resetWidth}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
