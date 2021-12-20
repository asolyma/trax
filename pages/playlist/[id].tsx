import { Playlist, Song } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import GradientLayout from "../../components/GradientLayout";
import { validateToken } from "../../lib/auth";
import { prismaClient } from "../../lib/prisma";

const getBGColor = (id: number) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};
const Playlist: NextPage<{ playlist: Playlist & { songs: Song[] } }> = ({
  playlist,
}) => {
  return (
    <GradientLayout
      rounded={false}
      title={playlist.name}
      subTitle="playlist"
      description={`${playlist.songs.length}`}
      color={getBGColor(playlist.id)}
      isLoading={true}
      image="https://picsum.photos/400"
    >
      <h1>{playlist?.name}</h1>
    </GradientLayout>
  );
};

export default Playlist;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = validateToken(req.cookies.T_ACCESS_TOKEN);
  const [playlist] = await prismaClient.playlist.findMany({
    where: {
      id: +(query.id as string),
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  console.log(playlist);
  return {
    props: { playlist: {} }, // will be passed to the page component as props
  };
};
