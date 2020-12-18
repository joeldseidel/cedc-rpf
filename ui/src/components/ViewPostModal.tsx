import * as React from 'react';
import {Post} from "../types/Post";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import styled from "styled-components";
import {Comment} from "../types/Comment";
import {User} from "../types/User";
import {FormEvent} from "react";
import {IUpdatePost, PostRequest} from "../types/requests/PostRequest";

export interface ViewPostModalProps {
    post : Post;
    currentUser : User;
    show : boolean;
    handleClose() : void;
}

export interface ViewPostModalState {
    comments : Comment[],
    showNewComment : boolean;
}

const CommentContainer = styled.div `
    min-height : 100%;
    min-width : 100%;
    display : flex;
    flex-flow : column nowrap;
`;

export class ViewPostModal extends React.Component<ViewPostModalProps, ViewPostModalState> {
    constructor(props : ViewPostModalProps){
        super(props);
        this.handleNewComment = this.handleNewComment.bind(this);
        this.createNewComment = this.createNewComment.bind(this);
        this.state = {
            comments : [] as Comment[],
            showNewComment : false
        }
    }

    handleNewComment(){
        this.setState({showNewComment : true});
    }

    createNewComment(e : FormEvent){
        e.preventDefault();
        let form : any = e.target;
        let comment = form.elements.newComment.value as string;
        let post = Object.assign({}, this.props.post);
        if(post.comments != undefined){
            post.comments.push({
                content : comment,
                creator : this.props.post.creator,
                createdTimestamp : new Date().toString()
            });
            let commentReq = new PostRequest();
            commentReq.updatePost(post).then((response : IUpdatePost) => {
                if(response.success){
                    this.setState({
                        comments : response.post.comments
                    });
                }
            });
        }
    }

    render() {
        let comments : any[] = [];
        if(this.props.post.comments != undefined){
            this.props.post.comments.forEach(comment=> {
                comments.push(
                    <Card style={{width : '100%'}}>
                        <Card.Body>
                            <h6>{comment.creator} at {comment.createdTimestamp} : </h6>
                            <p>{comment.content}</p>
                        </Card.Body>
                    </Card>
                );
            });
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.post.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <h6>Created by: {this.props.post.creator}</h6>
                    </Container>
                    <Container fluid>
                        <p>{this.props.post.content}</p>
                    </Container>
                    <Container fluid>
                        {
                            comments
                        }
                        {
                            this.state.showNewComment &&
                                <Form onSubmit={this.createNewComment}>
                                    <Form.Group as={Row} controlId="newComment">
                                        <Form.Label column sm={3}>
                                            Comment:
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control
                                                type="text"
                                                placeholder="An interesting comment..."
                                                name="newComment"
                                                id="newComment" />
                                        </Col>
                                        <Col sm={2}>
                                            <Button type="submit" variant="primary">Send</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                        }
                        <Button variant="secondary" onClick={this.handleNewComment}>
                            Add Comment
                        </Button>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}