import {
  Box,
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  Th,
  IconButton,
} from "@chakra-ui/react";
import { durationFormatter } from "../lib/formatters";
import TimeAgo from "react-timeago";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Song } from "@prisma/client";
import { SongsWithArtist, useStoreActions } from "../lib/types";
const Songtable: React.FC<{ songs: SongsWithArtist[] }> = ({ songs }) => {
  const changeActiveSong = useStoreActions((actions) => {
    return actions.changeActiveSong;
  });
  const changeActiveSongs = useStoreActions((actions) => {
    return actions.changeActiveSongs;
  });
  const handlePLay = (activeSong?: SongsWithArtist) => {
    changeActiveSong(activeSong || songs[0]);
    changeActiveSongs(songs);
  };
  return (
    <Box bg={"transparent"} color={"white"}>
      <Box padding={"10px"} marginBottom={"30px"} marginLeft={"20px"}>
        <IconButton
          aria-label="play"
          isRound
          colorScheme={"green"}
          size={"lg"}
          icon={<BsFillPlayFill fontSize={"30px"} />}
          onClick={() => {
            handlePLay();
          }}
        />
        <Table variant={"unstyled"}>
          <Thead
            borderBottom={"1px solid"}
            borderColor={"rgba(255,255,255,.2)"}
          >
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>DATE ADDED</Th>
              <Th>
                <AiOutlineClockCircle fontSize={"20px"} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => {
              return (
                <Tr
                  key={song.url}
                  sx={{
                    transition: "all .3s",
                    "&:hover": {
                      bg: "rgba(255,255,255,.1)",
                    },
                  }}
                  onClick={() => {
                    handlePLay(song);
                  }}
                  cursor={"pointer"}
                >
                  <Td>{i + 1}</Td>
                  <Td>{song.name}</Td>
                  <Td>
                    {<TimeAgo date={song.createdAt.toLocaleDateString()} />}
                  </Td>
                  <Td>{durationFormatter(song.duration)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
export default Songtable;
