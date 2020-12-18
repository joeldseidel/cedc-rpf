import * as React from 'react';
import {Alert, Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {UserCredentials} from "../types/UserCredentials";
import {FormEvent} from "react";
import {IGetUserAuthentication, UserRequest} from "../types/requests/UserRequest";
import {User} from "../types/User";

export interface LoginModalProps {
    show : boolean,
    handleLogin(user: User) : void;
    handleRegister() : void;
}

export interface LoginModalState {
    isLoginError : boolean,
    isMissingField : boolean
}

export class LoginModal extends React.Component<LoginModalProps, LoginModalState> {
    constructor(props : LoginModalProps) {
        super(props);
        this.state = {
            isLoginError : false,
            isMissingField : false
        };
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(e : FormEvent) {
        this.setState({
            isLoginError : false,
            isMissingField : false
        });
        e.preventDefault();
        let form : any = e.target;
        let email = form.elements.email.value;
        let password = form.elements.password.value;
        if(email == "" || password == ""){
            this.setState({isMissingField : true});
        } else {
            const userCredentials : UserCredentials = {
                email : email,
                password : password
            };
            let userReq = new UserRequest();
            userReq.getUserAuthentication(userCredentials).then(response => {
                const userResponse = response as IGetUserAuthentication;
                this.setState({isLoginError : !userResponse.isAuthenticated});
                if(userResponse.isAuthenticated && userResponse.success){
                    const authedUser = userResponse.user;
                    this.props.handleLogin(authedUser);
                }
            });
        }
    }

    render(){
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Login to CEDC Portal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.isLoginError &&
                            <Alert variant="danger">Could not login to CEDC Portal with these credentials</Alert>
                    }
                    {
                        this.state.isMissingField &&
                            <Alert variant="warning">Could not login to CEDC Portal, please enter a value in each field</Alert>
                    }
                    <Form onSubmit={this.handleLogin}>
                        <Form.Group>
                            <Form.Label>
                                Email:
                            </Form.Label>
                            <FormControl type="email" placeholder="Email Address" aria-label="Username" name="email"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password:
                            </Form.Label>
                            <FormControl type="password" placeholder="Password" aria-label="Password" name="password"/>
                        </Form.Group>
                        <Button variant="secondary" onClick={this.props.handleRegister}>Register</Button>
                        <Button type="submit" variant="primary">Login</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}