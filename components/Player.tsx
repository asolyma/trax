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
import { durationFormatter } from "../lib/formatters";
import { Store, useStoreActions } from "easy-peasy";
import { Song } from "@prisma/client";
import { SongsWithArtist, StoreModel, useStoreState } from "../lib/types";
import next from "next";
const Player: React.FC<{
  songs: SongsWithArtist[];
  activeSong: SongsWithArtist;
}> = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  //finding index of the active song
  const i = songs.findIndex((song) => {
    return song.name === activeSong.name;
  });
  const [index, setIndex] = useState(i);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef<ReactHowler>(null);
  const repeatRef = useRef(repeat);
  const [isSeeking, setIsSeeking] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const activesong = useStoreActions<StoreModel>(
    (state) => state.changeActiveSong
  );
  const volume = useStoreState((state) => state.volume);

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current?.seek(0);
    } else {
      nextSong();
    }
  };

  const onload = () => {
    const songDuration = soundRef.current?.duration();
    if (songDuration) {
      setDuration(songDuration);
      setLoaded((loaded) => true);
    } else {
      return;
    }
  };

  const onSeek = (e: number[]) => {
    setSeek(parseFloat(`${e[0]}`));
    soundRef.current?.seek(parseFloat(`${e[0]}`));
  };

  useEffect(() => {
    let timer: number;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current?.seek()!);
        timer = requestAnimationFrame(f);
      };
      timer = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timer);
    }
    return () => cancelAnimationFrame(timer);
  }, [playing, isSeeking]);

  useEffect(() => {
    activesong(songs[index]);
  }, [index, songs, activesong]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);
  const nextSong = () => {
    setIndex((index) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === index) {
          nextSong();
        }
        return next;
      } else {
        return index === songs.length - 1 ? 0 : index + 1;
      }
    });
  };
  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong.url}
          onEnd={onEnd}
          onLoad={onload}
          volume={volume}
        />
      </Box>
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
            onClick={() => {
              setIndex((index) => {
                return index ? index - 1 : songs.length - 1;
              });
            }}
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
            onClick={() => {
              setIndex((index) => {
                return index + 1;
              });
            }}
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
            <Text>{durationFormatter(seek)}</Text>
          </Box>
          <Box width={"80%"}>
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              color={"teal"}
              max={duration ? +duration.toFixed() : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => {
                setIsSeeking((state) => true);
              }}
              onChangeEnd={() => {
                setIsSeeking((state) => false);
              }}
            >
              <RangeSliderTrack bg="teal.600">
                <RangeSliderFilledTrack
                  bg="teal.100"
                  id="rangeSlider"
                ></RangeSliderFilledTrack>
              </RangeSliderTrack>
              {/* <RangeSliderThumb index={0} /> */}
            </RangeSlider>
          </Box>

          <Box fontSize={"xs"} width={"10%"} textAlign={"right"}>
            <Text>{durationFormatter(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default Player;
