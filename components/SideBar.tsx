import {
  Box,
  Divider,
  List,
  ListItem,
  ListIcon,
  Center,
  LinkBox,
  LinkOverlay,
  Spinner,
  Progress,
  Text,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  MdSearch,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import NextImage from "next/image";
import NextLink from "next/link";
import MenuListItems from "./MenuListItems";
import usePlaylist from "../hooks/usePlaylist";
const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/",
  },
];

const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);
const SideBar = () => {
  const hook = usePlaylist();

  return (
    <Box
      position={"absolute"}
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY={"20px"} height={"100%"}>
        <Box marginBottom={"20px"} paddingX={"20px"}>
          <NextImage src={"/logo.svg"} height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <MenuListItems menu={navMenu} />
        </Box>
        <Box marginTop={"20px"}>
          <MenuListItems menu={musicMenu} />
        </Box>
        <Divider borderColor="gray.700" />
        <Box
          height="66%"
          overflowY="auto"
          paddingY="20px"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray.700",
              borderRadius: "24px",
            },
          }}
        >
          {hook.isLoading ? (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Text fontSize={"sm"} colorScheme={"gray"} padding={"5px"}>
                Loading playlists
              </Text>
              <Spinner color="green.500" />
            </Box>
          ) : (
            <List spaceing={2}>
              {hook.playlists && !hook.isError ? (
                hook.playlists.map((playlist) => (
                  <ListItem paddingX="20px" key={playlist.id} fontSize={"sm"}>
                    <LinkBox>
                      <NextLink
                        href={{
                          pathname: `/playlist/[id]`,
                          query: { id: playlist.id },
                        }}
                        passHref
                      >
                        <LinkOverlay>{playlist.name}</LinkOverlay>
                      </NextLink>
                    </LinkBox>
                  </ListItem>
                ))
              ) : (
                <Alert status="error" fontSize={"x-small"} bgColor={"gray.900"}>
                  <AlertIcon />
                  <Text colorScheme={"gray"}>problem retrieving playlists</Text>
                </Alert>
              )}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
