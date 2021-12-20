import { User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
type userWithPlayListCount = User & {
  playlistcount: number;
};
const useMe = (): {
  user: userWithPlayListCount | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<userWithPlayListCount, any>("/me", fetcher);
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default useMe;
