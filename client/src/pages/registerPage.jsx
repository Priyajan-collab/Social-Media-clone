import { useState } from "react";
import { Navigate } from "react-router-dom";
function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginstatus, setLoginStatus] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password == confirmPassword) {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: userName, password: password }),
        });
        if (response.ok) {
          console.log(response);
          alert("Registration sucessful");
          setLoginStatus(true);
        } else {
          console.log("error");
          alert("Registration Failed");
        }
      } catch (e) {
        console.log("error");
      }
    } else {
      alert("The password do not match");
    }
  }
  if (loginstatus) {
    return <Navigate to="/login" />;
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

        <label className="mb-2 text-gray-700 font-semibold">
          Confirm Password
        </label>
        <input
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      <h1 className="font-bold text-2xl mt-8 text-center">
        This is the registration page
      </h1>
    </>
  );
}

export default RegisterPage;
