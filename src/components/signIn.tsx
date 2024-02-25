import { useEffect, useState } from "react";
import { useUserContext } from "../custom-hooks";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState(true);
  const navigate = useNavigate();
  const context = useUserContext();

  const userData = localStorage.getItem("userData") || "";

  useEffect(() => {
    if (context?.userContext?.isLoggedIn) {
      navigate("dashboard");
    }
  }, [context?.userContext?.isLoggedIn]);

  useEffect(() => {
    if (!!userData) {
      const user = {
        isLoggedIn: true,
        userDetails: {
          email: userData,
        },
      };
      context?.setUserContext(user);
    }
  }, [userData]);

  const handleSignIn = async () => {
    if(!username || !password) return;
    const userDetails = {
      email: username,
      password: password,
    };
    if (signIn) {
      const data = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (data.status === 200) {
        const userData = {
          isLoggedIn: true,
          userDetails: {
            email: username,
          },
        };
        context?.setUserContext(userData);
        localStorage.setItem("userData", username);
      }
    } else {
      const data = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const a = await data.json();
      console.log(a);

      if (data.status === 200) {
        const userData = {
          isLoggedIn: true,
          userDetails: {
            email: username,
          },
        };
        context?.setUserContext(userData);
        localStorage.setItem("userData", username);
      }
    }
  };

  const handleClick = () => {
    setPassword("");
    setUsername("");
    setSignIn(!signIn);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {signIn ? "LogIn" : "SignUp"}
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-300"
        >
          {signIn ? "LogIn" : "SignUp"}
        </button>
        <div className="text-xl mt-10 mb-6 text-center text-gray-800">
          {signIn ? "Create an account ?" : "Already a user ?"}
          <span className="ml-2 text-blue-900 font-bold" onClick={handleClick}>
            {signIn ? "SignUp" : "LogIn"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
