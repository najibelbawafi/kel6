import jwt from "jsonwebtoken";

const SECRET = "SECRET_KEY";

export interface JwtPayload {
  id: number;
  role: string;
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET) as JwtPayload;
};