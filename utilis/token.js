import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validation/token.validation.js";

const JWT_SECRET = process.env.SECREAT_KEY;

export async function createUserToken(payload) {
  const validationResult = await userTokenSchema.safeParseAsync(payload);

  if (validationResult.error) {
    throw new Error(validationResult.error._zod.message);
  }

  const payloadData = validationResult.data;

  const token = jwt.sign(payloadData, JWT_SECRET);

  return token;
}

export function validateUserToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    return payload;
  } catch (error) {
    return null;
  }
}
