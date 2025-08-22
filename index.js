import express from "express";
import userRouter from "./routes/user.routes.js";
import { authecticationMiddleware } from "./middleware/auth.middleware.js";

const app = express();

const port = 3000;

app.use(express.json());
app.use(authecticationMiddleware);
app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
