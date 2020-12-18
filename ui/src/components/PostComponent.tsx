import * as React from 'react';
import styled from "styled-components";
import {Card} from "react-bootstrap";
import {ViewPostModal} from "./ViewPostModal";
import {Post} from "../types/Post";
import {User} from "../types/User";

export interface PostComponentProps {
    post : Post;
    currentUser : User;
}

export interface PostComponentState {
    isShow : boolean;
}

export class PostComponent extends React.Component<PostComponentProps, PostComponentState> {
    constructor(props : PostComponentProps) {
        super(props);
        this.state = {
            isShow : false
        };
    }
    render() {
        return (
            <div>
                <Card style={{width : "18rem", margin : '8px'}} onClick={()=>{this.setState({isShow : true})}}>
                    <Card.Img variant="top"/>
                    <Card.Body>
                        <Card.Title>{this.props.post.title}</Card.Title>
                        <Card.Text>By {this.props.post.creator}</Card.Text>
                    </Card.Body>
                </Card>
                <ViewPostModal post={this.props.post} show={this.state.isShow} handleClose={() => { this.setState({isShow : false})}}  currentUser={this.props.currentUser}/>
            </div>
        );
    }
}