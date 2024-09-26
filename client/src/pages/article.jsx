// import React from "react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function Articles() {
//   const { id } = useParams();
//   const [postInformation, setPostInformation] = useState({});
//   console.log(id);
//   useEffect(() => {
//     fetch(`http://localhost:3000/post/${id}`).then((response) =>
//       response.json().then((postInfo) => setPostInformation(postInfo))
//     );
//   }, []);
//   const { postInfo } = postInformation;
//   //   console.log(postInfo);
//   const imageContainerSize = { width: 150, height: 200 }; // Adjust these values based on your design

//   if (!postInfo) return "";
//   return (
//     <>
//       <div className="post-container shadow-md rounded-lg overflow-hidden bg-white my-8 mx-4 md:mx-auto w-full md:w-2/3 lg:w-1/2">
//         <div className="flex">
//           <div
//             className="image-container"
//             style={{
//               width: `${imageContainerSize.width}px`,
//               height: `${imageContainerSize.height}px`,
//               overflow: "hidden",
//             }}
//           >
//             <img
//               className="w-full h-full object-cover"
//               src={`http://localhost:3000/${postInfo.file}`}
//               alt={postInfo.title}
//             />
//           </div>
//           <div className="p-6 flex flex-col" style={{ maxWidth: "400px" }}>
//             <h1 className="text-xl font-bold mb-2 text-center">
//               {postInfo.title}
//             </h1>
//             <h1 className="text-xl font-bold mb-2 ">
//               {postInfo.author.userName}
//             </h1>
//             <div
//               className="content overflow-hidden"
//               dangerouslySetInnerHTML={{
//                 __html: postInfo.content,
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Articles;

// chat gpt le tailwind css haldeko
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../userContext";

function Articles() {
  const { id } = useParams();
  const [postInformation, setPostInformation] = useState({});
  const { userInfo } = useContext(userContext);
  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => setPostInformation(postInfo))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);
  //I am not able to retreive individual contents of postInfo before return
  // console.log("hello", postInformation.postInfo);
  if (!postInformation.postInfo) return null;

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-md rounded-lg md:w-2/3 lg:w-1/2">
      <div className="flex flex-col items-center">
        <img
          className="w-full h-48 object-cover mb-4"
          src={`http://localhost:3000/${postInformation.postInfo.file}`}
          alt={postInformation.postInfo.title}
        />
        <h1 className="text-2xl font-bold mb-2 text-center">
          {postInformation.postInfo.title}
        </h1>
        <div className="flex gap-2">
          <h2 className="text-lg font-bold mb-4">
            By {postInformation.postInfo.author.userName}
          </h2>
          {userInfo &&
            userInfo.userName != null &&
            userInfo.userName === postInformation.postInfo.author.userName && (
              <Link className="text-lg mb-4" to={`/post/edit/${id}`}>
                edit
              </Link>
            )}
        </div>
        <div
          className="content overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: postInformation.postInfo.content,
          }}
        />
      </div>
    </div>
  );
}

export default Articles;
