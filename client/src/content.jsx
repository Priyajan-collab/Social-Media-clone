import { useEffect, useState } from "react";
import Post from "./post";

function Content() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/post").then((reponse) => {
      reponse.json().then((posts) => setPosts(posts));
    });
  }, []);
  console.log(posts);
  return (
    <>
      <div className="flex flex-col gap-10">
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <Post
                key={post._id}
                title={post.title}
                content={post.content}
                file={post.file}
                author={post.author}
                _id={post._id}
              />
            );
          })}
      </div>
    </>
  );
}

export default Content;
