import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import router from "next/router";
import { Box, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import { prismaClient } from "../lib/prisma";
import { Artist } from "@prisma/client";
import useMe from "../hooks/useMe";
const Home: NextPage<{ artists: Artist[]; error: any }> = ({
  artists,
  error,
}) => {
  const { user, isLoading, isError } = useMe();
  return (
    <GradientLayout
      image="https://avatars.githubusercontent.com/u/72451431?v=4"
      color="gray"
      rounded
      title={`${user?.firstname} ${user?.lastname}`}
      isLoading={(!isLoading && user) as boolean}
      subTitle="Profile"
      description={`${user?.playlistcount} public playlists`}
    >
      <Box color={"whitesmoke"} paddingX={"40px"}>
        <Box marginBottom={"40px"}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Top artists this month
          </Text>
          <Text fontSize={"md"}>Only visible to you</Text>
        </Box>
        {!error && (
          <Flex gap={"10px"} width={"100%"}>
            {artists?.map((artist) => (
              <Box
                width="20%"
                bgColor={"gray.900"}
                padding="15px"
                key={artist.id}
                rounded={"5px"}
              >
                <Image
                  alt={artist.name}
                  src={"https://avatars.githubusercontent.com/u/72451431?v=4"}
                  borderRadius={"100%"}
                />
                <Box marginTop={"20px"}>
                  <Text fontSize={"xl"}>{artist.name}</Text>
                  <Text color={"whiteAlpha.500"} fontSize={"xs"}>
                    Artist
                  </Text>
                </Box>
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </GradientLayout>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const artists = await prismaClient.artist.findMany({
      select: {
        id: true,
        name: true,
        songs: { select: { id: true, duration: true, url: true, name: true } },
      },
    });

    return {
      props: { artists: [...artists] },
    };
  } catch (error) {
    return {
      props: { error: "error" },
    };
  }
};
//get serverSideprops
