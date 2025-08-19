import express from "express";
import {db} from "../db/index.js"
import {userTable} from "../models/index.js"
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandetory" });
  }
  try {

    const existingUser=await db.
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
