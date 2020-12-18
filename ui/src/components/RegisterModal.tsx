import * as React from 'react';
import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import {User} from "../types/User";
import {FormEvent} from "react";
import {UserCredentials} from "../types/UserCredentials";
import {UserPermissions} from "../types/UserPermissions";
import {IPostRegisterUser, UserRequest} from "../types/requests/UserRequest";

export interface RegisterModalProps {
    show: boolean;
    handleRegister(user : User) : void;
    handleCancel() : void;
}

export interface RegisterModalState {
    isRegisterError: boolean;
    isMissingField: boolean;
}

export class RegisterModal extends React.Component<RegisterModalProps, RegisterModalState> {
    constructor(props : RegisterModalProps) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            isRegisterError : false,
            isMissingField : false
        }
    }
    handleRegister(e : FormEvent) {
        this.setState({
            isRegisterError : false,
            isMissingField : false
        });
        e.preventDefault();
        let form : any = e.target;
        let email = form.elements.registerEmail.value;
        let firstName = form.elements.firstname.value;
        let lastName = form.elements.lastname.value;
        let password = form.elements.registerPassword.value;
        if(email == "" || firstName == "" || lastName == "" || password == ""){
            this.setState({isMissingField : true});
        } else {
            const userCredentials : UserCredentials = {
                email : email,
                password : password
            };
            const userPermissions : UserPermissions = {
                canView : true,
                canPost : true,
                canComment : true,
                canAdmin : false
            }
            const user : User = {
                firstName : firstName,
                lastName : lastName,
                email : email,
                permissions : userPermissions,
                credentials : userCredentials
            }
            let userRequest = new UserRequest();
            userRequest.postRegisterUser(user).then(response => {
                const registerResponse = response as IPostRegisterUser;
                this.setState({isRegisterError : !registerResponse.isRegistered});
                if(registerResponse.success && registerResponse.isRegistered){
                    this.props.handleRegister(response.user);
                } else {
                    this.setState({isRegisterError : true});
                }
            });
        }
    }
    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Register with CEDC Portal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.isRegisterError &&
                            <Alert variant="danger">This username is already in use. Please login if this is an existing account or select another username.</Alert>
                    }
                    {
                        this.state.isMissingField &&
                            <Alert variant="warning">Please fill in every field to continue with registration</Alert>
                    }
                    <Form onSubmit={this.handleRegister}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="firstname">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control placeholder="First Name" name="firstname" id="firstname" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="lastname">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control placeholder="Last Name" name="lastname" id="lastname"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group as={Row} controlId="registerEmail">
                            <Form.Label column sm={2}>
                                Email:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" placeholder="Email Address" name="registerEmail" id="registerEmail" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="registerPassword">
                            <Form.Label column sm={2}>
                                Password:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="password" placeholder="Password" name="registerPassword" id="registerPassword" />
                            </Col>
                        </Form.Group>
                        <Button variant="secondary" onClick={this.props.handleCancel}>Cancel</Button>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}