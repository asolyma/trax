import jwt from "jsonwebtoken";
import bcrybt from "bcrypt";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { jwtUser, NextApiHandlerExtended } from "./types";
import { prismaClient } from "./prisma";

const validateAuth = (
  controller: NextApiHandlerExtended
): NextApiHandlerExtended => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.T_ACCESS_TOKEN;
    if (token) {
      let user;
      try {
        user = jwt.verify(token, `${process.env.TOKEN_SECRET}`) as jwtUser;
        user = await prismaClient.user.findUnique({
          where: { id: user.id },
        });

        if (!user) {
          throw new Error("Not a real User");
        }
      } catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
      }
      return controller(req, res, user);
    } else {
      return res.status(401).json({ error: "Not Authorized" });
    }
  };
};

export default validateAuth;

export const validateToken = (token: string) => {
  const user = jwt.verify(token, `${process.env.TOKEN_SECRET}`) as jwtUser;
  return user;
};
