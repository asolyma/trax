import useSWR from "swr";
import fetcher from "../lib/fetcher";
const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default useMe;
