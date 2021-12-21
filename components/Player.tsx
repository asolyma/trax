import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";

import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdOutlinePauseCircleFilled,
  MdOutlinePause,
  MdOutlineSkipNext,
  MdRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { Song } from "@prisma/client";
import { SongsWithArtist } from "../lib/types";
const Player: React.FC<{
  songs: SongsWithArtist[];
  activeSong: SongsWithArtist;
}> = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  return (
    <Box>
      <Box>{/* <ReactHowler playing={playing} src={activeSong.url} /> */}</Box>
      <Center color={"gray.600"}>
        <ButtonGroup>
          <IconButton
            aria-label="shuffle"
            fontSize={"25px"}
            color={shuffle ? "white" : ""}
            icon={<MdShuffle />}
            _focus={{ boxShadow: "none" }}
            onClick={() => {
              setShuffle(!shuffle);
            }}
            variant="link"
          />
          <IconButton
            aria-label="skip-previous"
            fontSize={"25px"}
            icon={<MdSkipPrevious />}
            _focus={{ boxShadow: "none" }}
            variant="link"
          />
          {!playing ? (
            <IconButton
              aria-label="play"
              fontSize={"25px"}
              icon={
                <MdOutlinePlayCircleFilled fontSize={"40"} color={"white"} />
              }
              variant="link"
              onClick={() => {
                setPlaying(() => {
                  return true;
                });
              }}
              _focus={{ boxShadow: "none" }}
            />
          ) : (
            <IconButton
              aria-label="pause"
              fontSize={"25px"}
              icon={
                <MdOutlinePauseCircleFilled fontSize={"40"} color="white" />
              }
              _focus={{ boxShadow: "none" }}
              variant="link"
              onClick={() => {
                setPlaying(() => {
                  return false;
                });
              }}
            />
          )}
          <IconButton
            aria-label="skip-next"
            fontSize={"25px"}
            icon={<MdSkipNext fontSize={"25"} />}
            _focus={{ boxShadow: "none" }}
            variant="link"
          />
          <IconButton
            aria-label="repeat"
            fontSize={"25px"}
            icon={<MdRepeat fontSize={"25"} />}
            _focus={{ boxShadow: "none" }}
            variant="link"
            color={repeat ? "white" : ""}
            onClick={() => {
              setRepeat((state) => {
                return !state;
              });
            }}
          />
        </ButtonGroup>
      </Center>
      <Box color={"gray.600"}>
        <Flex justify={"center"} align={"center"}>
          <Box fontSize={"xs"} width={"10%"} textAlign={"left"}>
            <Text>00</Text>
          </Box>
          <Box width={"80%"}>
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={300}
              color={"teal"}
            >
              <RangeSliderTrack bg="teal.600">
                <RangeSliderFilledTrack
                  bg="teal.200"
                  id="rangeSlider"
                ></RangeSliderFilledTrack>
              </RangeSliderTrack>
              {/* <RangeSliderThumb index={0} /> */}
            </RangeSlider>
          </Box>

          <Box fontSize={"xs"} width={"10%"} textAlign={"right"}>
            <Text>00</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default Player;
