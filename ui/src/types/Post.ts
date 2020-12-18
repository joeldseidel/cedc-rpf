import {Comment} from './Comment';

export interface Post {
    title : string;
    creator : string;
    tag : string;
    createdTimeStamp : string;
    content? : string;
    comments : Comment[];
}