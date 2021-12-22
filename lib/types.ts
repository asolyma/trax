import { createTypedHooks } from "easy-peasy";
import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { AppProps } from "next/app";
import { NextApiHandler } from "next";
import { Artist, Song, User } from "@prisma/client";
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
export interface SongsWithArtist {
  artist: Artist;
  duration: number;
  url: string;
  name: string;
  createdAt: Date;
}
[];

export interface StoreModel {
  volume: number;
  activeSongs: SongsWithArtist[];
  activeSong: SongsWithArtist | null;
  changeActiveSong: Action<StoreModel, SongsWithArtist>;
  changeActiveSongs: Action<StoreModel, SongsWithArtist[]>;
  chanevolume: Action<StoreModel, number>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
