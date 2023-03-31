// Tried using index.ts in types here and it bitched about it relentlessly, so here we are.
import { VeroUser } from "./types/users";
import { VeroEvent } from "./types/events";
import { VeroResponse } from "./types/veroResponse";
import { HTTP } from "./types/http"
import fetch from "node-fetch";

export class Vero {

    private readonly authToken: string;
    private readonly apiUrl: string = 'https://api.getvero.com/api/v2';

    public Users: VeroUser;

    public Events: VeroEvent;

    constructor(authToken: string) {
        this.authToken = authToken;
        this.Users = {
            track: this.track,
            reidentify: this.reidentify,
            unsubscribe: this.unsubscribe,
            resubscribe: this.resubscribe,
            editTags: this.editTags
        };
        this.Events = {
            track: this.trackEvent,
        }
    }

    private sendToVero = async (httpMethod: string, endpoint: string, data: object): Promise<VeroResponse> => {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                auth_token: this.authToken,
                ...data
            })
        })
        if (response.ok) {
            return await response.json() as VeroResponse;
        }
        return {
            status: response.status,
            message: await response.text()
        } as VeroResponse;
    }

    private track = async (userId: string, email: string, data: object): Promise<VeroResponse> => {
        return await this.sendToVero(HTTP.POST, '/users/track', {
            id: userId,
            email: email,
            data: data
        });
    };

    private reidentify = async (userId: string, newId: string): Promise<VeroResponse> => {
        return await this.sendToVero(HTTP.PUT, '/users/reidentify', {
            id: userId,
            new_id: newId
        });
    }

    private editTags = async (userId: string, add?: string[], remove?: string[]): Promise<VeroResponse> => {
        return await this.sendToVero(HTTP.PUT, '/users/tags/edit', {
            id: userId,
            add: add,
            remove: remove
        });
    };
    private unsubscribe = async (userId: string): Promise<VeroResponse> => {
        return await this.sendToVero(HTTP.POST,'/users/unsubscribe', { id: userId });
    }

    private resubscribe = async (userId: string): Promise<VeroResponse> => {
        return await this.sendToVero(HTTP.POST, '/users/resubscribe',{ id: userId });
    }
    private trackEvent = async (userId: string, email: string, eventName: string, data: object): Promise<VeroResponse> => {
        return await this.sendToVero(HTTP.POST, '/events/track', {
            identity: { id: userId, email: email },
            event_name: eventName,
            data: data
        });
    }
}