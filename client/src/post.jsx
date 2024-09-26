// function Post({ title, content, file }) {
//   return (
//     <>
//       <div className="">
//         <div className="flex mx-20 px-10 gap-10">
//           <img className="w-1/3  " src={"http://localhost:3000/" + file} />
//           <div className="flex flex-col">
//             <h1 className="font-bold">{title}</h1>
//             <div dangerouslySetInnerHTML={{ __html: content }} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Post;
import React from "react";
import { Link } from "react-router-dom";

function Post({ _id, title, content, file, author }) {
  // Function to limit the number of words in content
  const limitWords = (str, limit) => {
    const words = str.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return str;
  };

  return (
    <div
      className="post-container shadow-md rounded-lg overflow-hidden bg-white my-8 mx-4 md:mx-auto w-full md:w-2/3 lg:w-1/2"
      style={{ height: "200px" }}
    >
      <div className="flex flex-col md:flex-row">
        <Link to={`/post/${_id}`} className="md:w-1/3">
          <div className="image-container relative w-full h-48 md:h-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              style={{ width: "200px", height: "200px" }}
              src={`http://localhost:3000/${file}`}
              alt={title}
            />
          </div>
        </Link>
        <div className="p-6 flex flex-col md:w-2/3">
          <Link to={`/post/${_id}`}>
            <h1 className="text-xl font-bold mb-2 text-center md:text-left">
              {title}
            </h1>
          </Link>
          <h1 className="text-xl font-bold mb-2 ">{author.userName}</h1>
          <div className="content overflow-hidden">
            <div
              dangerouslySetInnerHTML={{ __html: limitWords(content, 30) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
