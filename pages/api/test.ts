import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.T_ACCESS_TOKEN;
  const user = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
  const playlist = await prismaClient.playlist.findMany({
    where: {
      id: 1,
      userId: user.id,
    },
    include: {},
  });
  return res.json({ playlist });
};
export default handler;
