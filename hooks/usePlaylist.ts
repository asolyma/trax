import { Playlist } from "@prisma/client";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
const usePlaylist = () => {
  const { data, error } = useSWR<Playlist[]>("/playlists", fetcher);
  return {
    playlists: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default usePlaylist;
