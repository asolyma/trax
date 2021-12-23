import {
  Box,
  Flex,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  StatHelpText,
  Text,
} from "@chakra-ui/react";
import { FiVolume2 } from "react-icons/fi";
import { HiVolumeOff } from "react-icons/hi";
import Player from "./Player";
import { useStoreState } from "../lib/types";
import { SongsWithArtist, StoreModel, useStoreActions } from "../lib/types";
import { Song } from "@prisma/client";
import { useState } from "react";
const PlayerBar = () => {
  const volume = useStoreState((state) => state.volume);
  const [mute, setMute] = useState(true);
  const activesong = useStoreState((state) => state.activeSong);
  const setVolume = useStoreActions((action) => action.chanevolume);
  const activeSong = useStoreState((state) => state.activeSong);
  const activeSongs = useStoreState((state) => state.activeSongs);
  return (
    <Box
      bg="gray.900"
      height={"100px"}
      padding={"10px"}
      width={"100vw"}
      color="white"
    >
      <Flex align={"center"} height={"100%"}>
        <Box padding={"20px"} width={"30%"} height={"100%"}>
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

        <Box
          width={"30%"}
          display={"flex"}
          justifyContent={"flex-end"}
          alignContent={"flex-end"}
          height={"100%"}
        >
          {activeSong && (
            <Box
              width={"150px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              marginX={"20px"}
            >
              {volume > 0.01 ? (
                <Icon
                  cursor={"pointer"}
                  color={"gray.600"}
                  as={FiVolume2}
                  fontSize={"25px"}
                />
              ) : (
                <Icon color={"gray.400"} as={HiVolumeOff} fontSize={"25px"} />
              )}

              <Slider
                marginX={"20px"}
                id="slider-track-1"
                defaultValue={30}
                min={0}
                max={1}
                step={0.1}
                onChange={(e) => {
                  setVolume(e);
                }}
              >
                <SliderTrack bg="gray.700" />
                <SliderFilledTrack bg="tomato" />
                <SliderThumb
                  size={2}
                  bg={"gray.700"}
                  _focus={{ boxShadow: "none" }}
                >
                  <Box color="gray" />
                </SliderThumb>
              </Slider>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
