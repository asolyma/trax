import { authMode, authReq } from "./types";
import fetcher from "./fetcher";
export const auth = (mode: authMode, data: authReq) => {
  return fetcher<string, authReq>(mode, data);
};
