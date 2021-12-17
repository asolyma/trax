import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../../lib/prisma";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const salt = bcrypt.genSaltSync();
    const { email, password } = req.body;
    let user;
    try {
      user = await prismaClient.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, salt),
        },
      });
    } catch (error) {
      res.status(401).json({
        message: "A user with the same email alredy exists",
        forgotpassword: true,
      });
      return;
    }
    const token = jwt.sign(
      { email: user.email, id: user.id, time: Date.now() },
      "topoftheworldkiki",
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
    res.status(404).json({ message: "unsupported http verb ya rayes" });
  }
}
