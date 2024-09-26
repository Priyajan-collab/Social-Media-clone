import { useContext, useState } from "react";
import { Navigate, json } from "react-router-dom";
import { userContext } from "../userContext";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(userContext);
  async function handleSubmit(e) {
    e.preventDefault();
    if (userName === "" || password === "") {
      alert("Fill something bro");
    } else {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userName: userName, password: password }),
        });
        if (response.ok) {
          response.json().then((userInfo) => {
            // console.log("userinfo from handle submit", userInfo);
            setUserInfo(userInfo);
            setRedirect(true);
          });

          console.log("yo");
        } else {
          console.log("error");
        }
      } catch (e) {
        console.log("error");
      }
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <form
        className="flex flex-col w-1/3 m-auto p-8 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <label className="mb-2 text-gray-700 font-semibold">Username</label>
        <input
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className="mb-2 text-gray-700 font-semibold">Password</label>
        <input
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>

      <h1 className="font-bold text-2xl mt-8 text-center">
        This is the login page
      </h1>
    </>
  );
}

export default LoginPage;
