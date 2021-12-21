import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { AppProps } from "next/app";
import { NextApiHandler } from "next";
import { Song, User } from "@prisma/client";
import { Action } from "easy-peasy";

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

export interface StoreModel {
  activeSongs: Song[];
  activeSong: Song | null;
  changeActiveSong: Action<StoreModel, Song>;
  changeActiveSongs: Action<StoreModel, Song[]>;
}
