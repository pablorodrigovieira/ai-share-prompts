import { Session } from "next-auth";

export interface SessionUser {
  _id: any;
  email: string;
  username: string;
  __v: number;
}

export interface IUser {
  email: string;
  username: string;
  image?: string;
  _id?: string;
  id?: string;
}

export interface IUserSession {
  data: {
    user: IUser;
  };
}

export interface IPrompt {
  _id: string;
  prompt: string;
  tag: string;
  creator: IUser;
  save: () => void;
}

export interface IParams {
  id: string;
}
