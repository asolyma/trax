import { Box, Flex, Text } from "@chakra-ui/react";
import Player from "./Player";

const PlayerBar = () => {
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
          <Text fontSize={"large"}>songname</Text>
          <Text fontSize={"sm"}>artistname</Text>
        </Box>
        <Box width={"40%"} textAlign={"center"}>
          <Player />
        </Box>
        <Box width={"30%"} textAlign={"right"}>
          controls
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
