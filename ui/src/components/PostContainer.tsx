import * as React from 'react';
import styled from "styled-components";
import {Post} from "../types/Post";
import {Alert, Container, Spinner} from "react-bootstrap";
import {PostComponent} from "./PostComponent";
import {IGetPosts, PostRequest} from "../types/requests/PostRequest";
import {User} from "../types/User";

const PostFlexContainer = styled.div `
    display : flex;
    flex-flow : row wrap;
    justify-content : flex-start;
`;

export interface PostContainerProps {
    posts : Post[];
    title : string;
    currentUser : User;
}

export class PostContainer extends React.Component<PostContainerProps, {}> {
    constructor(props : PostContainerProps) {
        super(props);
    }

    render() {
        let posts : any[] = [];
        this.props.posts.forEach((post : Post) => {
            posts.push(<PostComponent title={post.title} creator={post.creator}/>);
        });
        return (
            <Container fluid>
                <h2>{this.props.title}</h2><hr/>
                {
                    !this.props.currentUser.permissions.canView &&
                        <Alert variant="danger">You are not allowed to view posts</Alert>
                }
                <PostFlexContainer>
                    {
                        posts
                    }
                </PostFlexContainer>
            </Container>
        );
    }
}