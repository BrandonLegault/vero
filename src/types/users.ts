import { VeroResponse } from "./veroResponse";

export type Track = (
  userId: string,
  email: string,
  data: Record<string, unknown>
) => Promise<VeroResponse>;
export type Reidentify = (
  userId: string,
  newId: string
) => Promise<VeroResponse>;
export type Unsubscribe = (userId: string) => Promise<VeroResponse>;
export type Resubscribe = (userId: string) => Promise<VeroResponse>;
export type EditTags = (
  userId: string,
  add?: string[],
  remove?: string[]
) => Promise<VeroResponse>;

export type VeroUser = {
  track: Track;
  reidentify: Reidentify;
  unsubscribe: Unsubscribe;
  resubscribe: Resubscribe;
  editTags: EditTags;
};
