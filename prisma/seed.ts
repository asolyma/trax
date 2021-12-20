import { artistsData } from "./data";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
import bcrypt from "bcrypt";
const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      await prismaClient.artist.upsert({
        where: {
          name: artist.name,
        },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => {
              return {
                duration: song.duration,
                name: song.name,
                url: song.url,
              };
            }),
          },
        },
      });
    })
  );
  const salt = await bcrypt.genSalt();
  const user = await prismaClient.user.upsert({
    where: { email: "asolyma@hotmail.com" },
    update: {},
    create: {
      email: "asolyma@hotmail.com",
      password: bcrypt.hashSync("password", salt),
      firstname: "Amr",
      lastname: "Soliman",
    },
  });
  await Promise.all(
    new Array(10).fill(1).map(async (_, index) => {
      return prismaClient.playlist.create({
        data: {
          name: `playlist #${index + 1}`,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
