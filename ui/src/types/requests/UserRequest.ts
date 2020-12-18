import {APIRequest} from "../APIRequest";
import {UserCredentials} from "../UserCredentials";
import {APIRequestResponse} from "../APIRequestResponse";
import {User} from "../User";

export class UserRequest extends APIRequest {
    public async getUserAuthentication(userCreds : UserCredentials) : Promise<IGetUserAuthentication> {
        this.endpoint = "/user/auth";
        this.body = {
            credentials : userCreds
        };
        return await this.send() as IGetUserAuthentication;
    }
    public async postRegisterUser(user : User) : Promise<IPostRegisterUser> {
        this.endpoint = "/user/new";
        this.body = {
            user : user
        };
        return await this.send() as IPostRegisterUser;
    }
}

/**
 * Get user authentication API request response prototype
 */
export interface IGetUserAuthentication extends APIRequestResponse {
    isAuthenticated : boolean;
    user : User;
}

/**
 * Post user registration API request response prototype
 */
export interface IPostRegisterUser extends APIRequestResponse {
    isRegistered : boolean;
    user : User;
}