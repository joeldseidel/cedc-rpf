import * as React from 'react';
import {Alert, Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {FormEvent} from "react";
import {User} from "../types/User";
import {PostRequest} from "../types/requests/PostRequest";
import {Post} from "../types/Post";
import {APIRequestResponse} from "../types/APIRequestResponse";

export interface CreatePostModalProps {
    show : boolean;
    handleCancel() : void;
    handleCreatePost() : void;
    currentUser : User;
}

export interface CreatePostModalState {
    isMissingField : boolean;
}

export class CreatePostModal extends React.Component<CreatePostModalProps, CreatePostModalState> {
    constructor(props : CreatePostModalProps) {
        super(props);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.state = {
            isMissingField : false
        };
    }

    handleCreatePost(e : FormEvent) {
        this.setState({isMissingField : false});
        e.preventDefault();
        let form : any = e.target;
        let title = form.elements.newPostTitle.value;
        let creator = this.props.currentUser.email;
        let content = form.elements.newPostContent.value;
        let tag = form.elements.newPostTag == undefined ? "all" : form.elements.newPostTag.value;
        let createdTimeStamp = new Date().toString();
        if(title == "" || content == "") {
            this.setState({isMissingField : true});
        } else {
            const post : Post = {
                title : title,
                creator : creator,
                content : content,
                createdTimeStamp : createdTimeStamp,
                tag : tag,
                comments : []
            };
            let postRequest = new PostRequest();
            postRequest.postPost(post).then(postResponse => {
                let postRes = postResponse as APIRequestResponse;
                if(postRes.success){
                    this.props.handleCreatePost();
                }
            });
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        {
                            this.state.isMissingField &&
                                <Alert variant="warning">Each field is required to create a post. Please fill in each field to continue.</Alert>
                        }
                        <Form onSubmit={this.handleCreatePost}>
                            <Form.Group controlId="newPostTitle">
                                <Form.Label>Post Title:</Form.Label>
                                <Form.Control
                                    placeholder="An interesting title..."
                                    name="newPostTitle"
                                    id="newPostTitle"
                                    aria-describedBy="newPostTitleHelpBlock" />
                                <Form.Text id="newPostTitleHelpBlock" muted>
                                    Your title should be a quick, 3-5 word overview of the post's content.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="newPostCreator">
                                <Form.Label>Creator:</Form.Label>
                                <Form.Control
                                    id="newPostCreator"
                                    type="text"
                                    aria-describedBy="newPostCreatorHelpBlock"
                                    placeholder={this.props.currentUser.firstName + " " + this.props.currentUser.lastName}
                                    readOnly />
                                <Form.Text id="newPostCreatorHelpBlock" muted>
                                    That's you!
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="newPostContent">
                                <Form.Label>Post Content:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={8}
                                    aria-describedBy="newPostContentHelpBlock"
                                    id="newPostContent"
                                    name="newPostContent" />
                                <Form.Text id="newPostContentHelpBlock" muted>
                                    The content section can be filled with as many thoughts as you have. This is the space to convey your idea, plans, or request to the community.
                                </Form.Text>
                            </Form.Group>
                            {
                                this.props.currentUser.permissions.canAdmin &&
                                    <Form.Group controlId="newPostTag">
                                        <Form.Label>Post Tag:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            id="newPostTag"
                                            name="newPostTag"
                                            aria-describedBy="newPostTagHelpBlock">
                                            <option value="all">General Post</option>
                                            <option value="starred">Starred Post</option>
                                        </Form.Control>
                                        <Form.Text id="newPostContentHelpBlock" muted>
                                            Select the tag for this post. This option is only visible to administrators.
                                        </Form.Text>
                                    </Form.Group>
                            }
                            <Button variant="secondary" onClick={this.props.handleCancel}>Cancel</Button>
                            <Button type="submit" variant="primary">Create Post</Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}