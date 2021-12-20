import validateAuth from "../../lib/auth";
import { prismaClient } from "../../lib/prisma";

export default validateAuth(async (req, res, user) => {
  const playlists = await prismaClient.playlist.findMany({
    orderBy: { name: "asc" },
    where: { userId: user!.id },
  });
  return res.json(playlists);
});
