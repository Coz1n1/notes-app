import { useState, ChangeEvent } from "react";
import Input from "../../components/Input";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const SignIn = () => {
  const [navi, setNavi] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const registerHandler = () => {
    if (name != "" && password != "" && email != "") {
      axios
        .post("http://localhost:3002/register", {
          username: name,
          password: password,
          email: email,
        })
        .then((response) => {
          console.log(response);
          toast({
            title: "Info",
            description: response.data,
          });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      toast({
        title: "Info",
        description: "Fill in all areas",
      });
    }
  };

  const loginHandler = () => {
    if (name != "" && password != "") {
      axios
        .post("http://localhost:3002/login", {
          username: name,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          if (!response.data.error) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("username", response.data.username);
            navigate("/goodnotes");
          } else {
            toast({
              title: "Info",
              description: response.data.error,
            });
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      toast({
        title: "Info",
        description: "Fill in all areas",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex bg-[#0B0A10]">
      <div className="flex justify-center items-center flex-1 w-full h-full">
        <div className="flex flex-col items-center justify-center py-8 w-[340px] md:w-[500px] bg-zinc-800/30 rounded-xl gap-2">
          <div className="flex items-center">
            <span>
              <FaAngleLeft
                size={32}
                className="cursor-pointer"
                onClick={() => navigate("/")}
              />
            </span>
            <span className="text-3xl font-bold text-[#e44848]">
              {navi ? "Register" : "Login"}
            </span>
          </div>
          <Input
            name="Username"
            id="username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            value={name}
          />
          {navi ? (
            <Input
              name="E-mail"
              id="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              type="email"
              value={email}
            />
          ) : (
            <></>
          )}
          <Input
            name="Password"
            id="username"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button
            className="bg-[#e44848] px-4 py-2 mt-2 rounded-lg font-bold text-lg"
            onClick={navi ? registerHandler : loginHandler}
          >
            {navi ? "Register" : "Login"}
          </button>
          <h1 className="font-bold mt-2 text-white">
            {navi ? "Already have an account?" : "Don't have an account?"}
          </h1>
          <h1
            className="text-[#6CBF0D] underline font-bold cursor-pointer"
            onClick={() => setNavi(!navi)}
          >
            {navi ? "Login here" : "Register here"}
          </h1>
        </div>
      </div>
      <div className="hidden lg:flex flex-1">
        <img
          src="/imgs/login_background.jpg"
          alt="login placeholder"
          className="object-cover w-full h-full"
        />
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
