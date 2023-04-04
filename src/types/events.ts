import { VeroResponse } from "./veroResponse";

export type Track = (
  userId: string,
  email: string,
  eventName: string,
  data: Record<string, unknown>
) => Promise<VeroResponse>;

export type VeroEvent = {
  track: Track;
};
