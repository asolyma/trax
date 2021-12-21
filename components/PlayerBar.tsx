import { Box, Flex, StatHelpText, Text } from "@chakra-ui/react";
import Player from "./Player";
import { useStoreState } from "easy-peasy";
import { SongsWithArtist, StoreModel } from "../lib/types";
import { Song } from "@prisma/client";
const PlayerBar = () => {
  const activeSong: SongsWithArtist = useStoreState<StoreModel>(
    (state) => state.activeSong
  );
  const activeSongs: SongsWithArtist[] = useStoreState<StoreModel>(
    (state) => state.activeSongs
  );
  return (
    <Box
      bg="gray.900"
      height={"100px"}
      padding={"10px"}
      width={"100vw"}
      color="white"
    >
      <Flex align={"center"}>
        <Box padding={"20px"} width={"30%"}>
          {activeSong ? (
            <Text fontSize={"large"}>{activeSong.name}</Text>
          ) : null}
          {activeSong ? (
            <Text fontSize={"sm"}>{activeSong.artist.name}</Text>
          ) : null}
        </Box>
        <Box width={"40%"} textAlign={"center"}>
          {activeSong ? (
            <Player songs={activeSongs} activeSong={activeSong} />
          ) : null}
        </Box>

        <Box width={"30%"} textAlign={"right"}>
          controls
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
