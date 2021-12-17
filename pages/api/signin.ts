import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { prismaClient } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "unsupported http verb" });
  }
  const { email, password } = req.body;
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user.id, time: Date.now() },
        `${process.env.TOKEN_SECRET}`,
        { expiresIn: "8h" }
      );
      res.setHeader(
        "Set-cookie",
        cookie.serialize("T-ACCESS-TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          sameSite: "lax",
          path: "/",
          secure: process.env.NODE_ENV === "production",
        })
      );
      res.json({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401).json({ message: "user or password is incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export default signin;
