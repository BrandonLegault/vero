// Tried using index.ts in types here and it bitched about it relentlessly, so here we are.
import fetch from "node-fetch";
import { VeroUser } from "./types/users";
import { VeroEvent } from "./types/events";
import { VeroResponse } from "./types/veroResponse";
import Http from "./types/http";

export default class Vero {
  private readonly authToken: string;

  private readonly apiUrl: string = "Https://api.getvero.com/api/v2";

  public Users: VeroUser;

  public Events: VeroEvent;

  constructor(authToken: string) {
    this.authToken = authToken;
    this.Users = {
      track: this.track,
      reidentify: this.reidentify,
      unsubscribe: this.unsubscribe,
      resubscribe: this.resubscribe,
      editTags: this.editTags,
    };
    this.Events = {
      track: this.trackEvent,
    };
  }

  private sendToVero = async (
    HttpMethod: string,
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<VeroResponse> => {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method: HttpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_token: this.authToken,
        ...data,
      }),
    });
    if (response.ok) {
      return (await response.json()) as VeroResponse;
    }
    return {
      status: response.status,
      message: await response.text(),
    } as VeroResponse;
  };

  private track = async (
    userId: string,
    email: string,
    data: Record<string, unknown>
  ): Promise<VeroResponse> => {
    return this.sendToVero(Http.POST, "/users/track", {
      id: userId,
      email,
      data,
    });
  };

  private reidentify = async (
    userId: string,
    newId: string
  ): Promise<VeroResponse> => {
    return this.sendToVero(Http.PUT, "/users/reidentify", {
      id: userId,
      new_id: newId,
    });
  };

  private editTags = async (
    userId: string,
    add?: string[],
    remove?: string[]
  ): Promise<VeroResponse> => {
    return this.sendToVero(Http.PUT, "/users/tags/edit", {
      id: userId,
      add,
      remove,
    });
  };

  private unsubscribe = async (userId: string): Promise<VeroResponse> => {
    return this.sendToVero(Http.POST, "/users/unsubscribe", {
      id: userId,
    });
  };

  private resubscribe = async (userId: string): Promise<VeroResponse> => {
    return this.sendToVero(Http.POST, "/users/resubscribe", {
      id: userId,
    });
  };

  private trackEvent = async (
    userId: string,
    email: string | null,
    eventName: string,
    data: Record<string, unknown>
  ): Promise<VeroResponse> => {
    return this.sendToVero(Http.POST, "/events/track", {
      identity: { id: userId, email },
      event_name: eventName,
      data,
    });
  };
}
