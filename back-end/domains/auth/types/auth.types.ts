import { IResponse } from "../../../types/server.types.js";

export interface User {
    id:number,
    email:string,
    username:string
};
export interface RegisterRequestBody {
    username: string,
    email: string,
    password: string
};

export interface LoginRequestBody {
    email:string,
    password:string
};



export interface RegisterResponsePayload extends IResponse {
    data:User
};

export interface LoginResponsePayload extends IResponse {
    token:string
};

export interface ProfileParams  {
    id:string
};
