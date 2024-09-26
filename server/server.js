import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
const saltRounds = 10;
const jwt = jsonwebtoken;
const secretKey = "asdnm45lkjqwe";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import fs from "fs";
import postModel from "./models/post.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
const url = "mongodb://localhost:27017/abc";
mongoose.connect(url);

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    console.log("error rendering user", e);
  }
});
app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  const createUser = new User({
    userName: userName,
    password: await bcrypt.hash(password, saltRounds),
  });
  async function saveUser() {
    try {
      await createUser.save();
      console.log("User created");
      res.status(200).json({ message: "User created successfully" });
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ message: "There is a problem in creating User" });
    }
  }
  saveUser();
});
app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userDoc = await User.findOne({ userName });
  const passOk = await bcrypt.compare(password, userDoc.password);
  if (passOk) {
    jwt.sign({ userName, id: userDoc._id }, secretKey, {}, (e, token) => {
      if (e) throw e;
      res.cookie("token", token).json({
        id: userDoc._id,
        userName,
      });
    });
  } else {
    res.status(400).json({ message: "Wrong Credentitals" });
  }
});
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  // console.log(req.cookies);
  if (token) {
    const userInfo = jwt.verify(token, secretKey, {});

    res.json(userInfo);
  } else {
    res.status(401).json("no user is logged in");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json("logged out");
});

app.post("/createPost", upload.single("file"), async (req, res) => {
  const { content, title } = req.body;
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  try {
    const { token } = req.cookies;
    if (token) {
      const userInfo = jwt.verify(token, secretKey, {});
      const postDoc = await postModel.create({
        title: title,
        content: content,
        file: newPath,
        author: userInfo.id,
      });
      res.json(postDoc);
    }
  } catch (e) {
    if (e) throw e;
  }
});

app.get("/post", async (req, res) => {
  res.json(
    await postModel
      .find()
      .populate("author", ["userName"])
      .sort({ createdAt: -1 })
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  const postInfo = await postModel
    .findById(id)
    .populate("author", ["userName"]);
  res.json({ postInfo });
});

app.get("/post/edit/:id", async (req, res) => {
  const { id } = req.params;
  const postInfo = await postModel
    .findById(id)
    .populate("author", ["userName"]);
  res.json({ postInfo });
});

app.put("/post/edit/:id", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  const newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  // console.log(req.cookies);
  if (token) {
    jwt.verify(token, secretKey, {}, async (err, info) => {
      if (err) throw err;
      const { title, content, currentId, authorId } = req.body;
      const putDoc = await postModel.findById(id);
      if (JSON.stringify(putDoc.author) === JSON.stringify(info.id)) {
        await putDoc.updateOne({
          $set: { title, content, file: newPath ? newPath : putDoc.file },
        });

        res.json(putDoc);
      } else {
        res.status(400).json("You are not the author of this post");
      }
    });
  } else {
    res.status(401).json("no user is logged in");
  }
});

app.listen(3000, () => {
  console.log("The server is running at http://localhost:3000");
});
