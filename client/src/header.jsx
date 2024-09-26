import { useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./userContext";
import { useContext } from "react";

function Header() {
  const { userInfo, setUserInfo } = useContext(userContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Error fetching profile data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  }
  const userName = userInfo?.userName;

  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white mb-4 ">
        <Link to="/" className="text-2xl font-bold">
          Blog
        </Link>

        <div className="flex items-center gap-4">
          {userName && (
            <>
              <Link
                to="/createPost"
                className="hover:text-gray-300 transition duration-300 align-middle"
              >
                Create Post
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          )}
          {!userName && (
            <>
              <Link
                to="/register"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
    // <>
    //   <div className="flex justify-between  mb-10 ">
    //     <Link to="/" className="font-bold">
    //       Blog
    //     </Link>

    //     <div className="flex gap-4">
    //       {userName && (
    //         <>
    //           <h2>create post</h2>
    //           <button
    //             onClick={logout}
    //             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    //           >
    //             Logout
    //           </button>
    //         </>
    //       )}
    //       {!userName && (
    //         <>
    //           <Link
    //             to="/Register"
    //             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    //           >
    //             Sign Up
    //           </Link>
    //           <Link
    //             to="/Login"
    //             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    //           >
    //             Login
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </>
  );
}

export default Header;
