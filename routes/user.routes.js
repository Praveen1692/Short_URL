import express from "express";
import { db } from "../db/index.js";
import { userTable } from "../models/index.js";
import { eq } from "drizzle-orm";
import { signupRequestBodySchema } from "../validation/request.validation.js";
import { randomBytes, createHmac } from "crypto";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResult = await signupRequestBodySchema.safeParse(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandetory" });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  try {
    const [existingUser] = await db
      .select({
        id: userTable.id,
      })
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `Please try with different email , user already exit with the ${email} id `,
      });
    }

    const salt = randomBytes(256).toString("hex");

    const hashPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    const [user] = await db
      .insert(userTable)
      .values({
        firstname,
        lastname,
        email,
        salt,
        password: hashPassword,
      })
      .returning({ id: userTable.id });

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: { userId: user.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
