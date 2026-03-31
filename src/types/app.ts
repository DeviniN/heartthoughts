export type Language = "en" | "ko";
export type AuthTab = "login" | "register";
export type Page = "home" | "profile";

export interface Entry {
  title: string;
  body: string;
  imgData: string | null;
  date: string;
}

export interface UserRecord {
  name: string;
  pass: string;
  imgData: string | null;
  emoji: string;
  entries: Entry[];
}

export type UsersByKey = Record<string, UserRecord>;
