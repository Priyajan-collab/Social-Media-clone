import "./App.css";
import Header from "./header";
import Content from "./content";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { UserContextProvider } from "./userContext";
import CreatePost from "./pages/createPost";
import Articles from "./pages/article";
import EditPost from "./pages/editPost";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Content />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Articles />} />
            <Route path="/post/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
