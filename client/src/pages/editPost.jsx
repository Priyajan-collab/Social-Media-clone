import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { userContext } from "../userContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditPost() {
  const { id } = useParams();
  const { userInfo } = useContext(userContext);
  const [postInfo, setPostInfo] = useState({});
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [reDirect, setReDirect] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  //   console.log(id);
  //   console.log(userInfo.id);
  useEffect(() => {
    setCurrentId(userInfo.id);

    fetch(`http://localhost:3000/post/edit/${id}`).then((response) =>
      response
        .json()
        .then((postDataObject) => {
          const postData = postDataObject.postInfo;
          const author = postData.author;
          setPostInfo(author);
          setTitle(postData.title);
          setContent(postData.content);
          setFile(postData.file);
          setAuthorId(author._id);
        })
        .catch((e) => console.log(e))
    );
  }, [userInfo.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("file", file?.[0]);
    formData.set("authorId", authorId);
    // console.log(currentId);

    formData.set("currentId", currentId);

    const response = await fetch(`http://localhost:3000/post/edit/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    if (response.ok) {
      const jsonResponse = response.json();
      setReDirect(true);
      //   console.log(response);
    }
  }
  if (reDirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <>
      <form
        className="flex flex-col w-1/3 m-auto p-8 bg-white shadow-md rounded-lg gap-5"
        onSubmit={handleSubmit}
      >
        {/* <h1>{postInfo.title} hello</h1> */}
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
export default EditPost;
