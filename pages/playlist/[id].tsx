import { Playlist, Song, User } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import GradientLayout from "../../components/GradientLayout";
import TableComponent from "../../components/TableComponent";
import { validateToken } from "../../lib/auth";
import { prismaClient } from "../../lib/prisma";
import { jwtUser } from "../../lib/types";

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
    "pink",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};
const Playlistt: NextPage<{ playlist: Playlist & { songs: Song[] } }> = ({
  playlist,
}) => {
  return (
    <GradientLayout
      rounded={false}
      title={playlist.name}
      subTitle="playlist"
      description={`${playlist.songs.length} songs in this playlist`}
      color={getBGColor(playlist.id)}
      isLoading={true}
      image={`https://picsum.photos/500/?random=${playlist.id}`}
    >
      <TableComponent songs={playlist.songs} />
    </GradientLayout>
  );
};

export default Playlistt;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let user: jwtUser;
  try {
    user = validateToken(req.cookies.T_ACCESS_TOKEN);
    const [playlist] = await prismaClient.playlist.findMany({
      where: {
        id: +(query.id as string),
        userId: user.id,
      },
      include: {
        songs: {
          select: {
            artist: true,
            duration: true,
            url: true,
            name: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      props: { playlist }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        statusCode: 401,
        destination: "/signin",
      },
    };
  }
};
