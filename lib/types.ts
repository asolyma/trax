import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { AppProps } from "next/app";
import { NextApiHandler } from "next";
import { User } from "@prisma/client";

export enum authMode {
  SIGNIN = "signin",
  SIGNUP = "signup",
}
export interface authReq {
  email: string;
  password: string;
}

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean;
};

export type ExtendedAppProps<P = {}> = AppProps<P> & {
  Component: NextPageWithAuth;
};

export interface NextApiHandlerExtended {
  (req: NextApiRequest, res: NextApiResponse, user?: User): void;
}
export interface jwtUser {
  email: string;
  id: number;
  time: number;
  iat: number;
  exp: number;
}
