import {APIRequest} from "../APIRequest";
import {APIRequestResponse} from "../APIRequestResponse";
import {Post} from "../Post";

export class PostRequest extends APIRequest {
    public async getPosts() {
        this.endpoint = "/post/get";
        return await this.send() as IGetPosts;
    }
    public async postPost(post : Post) {
        this.endpoint = "/post/new";
        this.body = {
            post : post
        };
        return await this.send() as APIRequestResponse;
    }
    public async updatePost(post : Post){
        this.endpoint = "/post/update";
        this.body = {
            post : post
        }
        return await this.send() as IUpdatePost;
    }
}

export interface IGetPosts extends APIRequestResponse {
    posts : Post[];
}

export interface IUpdatePost extends APIRequestResponse {
    post : Post;
}