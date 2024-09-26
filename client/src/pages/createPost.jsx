import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, redirect } from "react-router-dom";

function CreatePost() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [reDirect, setReDirect] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("content", content);
      data.set("file", file[0]);
      data.set("title", title);
      e.preventDefault();
      const response = await fetch("http://localhost:3000/createPost", {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (response.ok) {
        setReDirect(true);
        console.log(redirect);
      }
    } catch (e) {
      if (e) throw e;
    }
  }
  if (reDirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <form
        className="flex flex-col w-1/3 m-auto p-8 bg-white shadow-md rounded-lg gap-5"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="file"
          type="file"
          onChange={(e) => setFile(e.target.files)}
        />
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreatePost;
