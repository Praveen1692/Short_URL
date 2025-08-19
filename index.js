import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
