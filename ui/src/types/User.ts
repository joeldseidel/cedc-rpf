import {UserPermissions} from "./UserPermissions";
import {UserCredentials} from "./UserCredentials";

export interface User {
    firstName : string;
    lastName : string;
    email : string;
    permissions : UserPermissions;
    credentials : UserCredentials;
}