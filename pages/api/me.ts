import validateRoute from "../../lib/auth";
import { prismaClient } from "../../lib/prisma";
export default validateRoute(async (req, res, user) => {
  const playlistcount = await prismaClient.playlist.count({
    where: {
      userId: user?.id,
    },
  });
  res.json({ ...user, playlistcount });
});
