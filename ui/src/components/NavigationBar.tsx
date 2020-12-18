import * as React from 'react';
import {Navbar, Nav, NavItem, Form, Button, ButtonGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {User} from "../types/User";

export interface NavigationBarProps {
    currentUser : User | undefined;
    handleToggleLoginModal() : void;
    handleToggleRegisterModal() : void;
}

export class NavigationBar extends React.Component<NavigationBarProps, { }> {
    constructor(props : NavigationBarProps) {
        super(props);
    }

    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavItem>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </NavItem>

                    </Nav>
                    {
                        this.props.currentUser != undefined &&
                            <Navbar.Text>
                                Signed in as: {this.props.currentUser.firstName + " " + this.props.currentUser.lastName}
                            </Navbar.Text>
                    }
                    {
                        this.props.currentUser == undefined &&
                            <NavItem>
                                <ButtonGroup aria-label="Login button">
                                    <Button variant="secondary" type="button" onClick={this.props.handleToggleLoginModal}>Login</Button>
                                    <Button variant="primary" type="button" onClick={this.props.handleToggleRegisterModal}>Register</Button>
                                </ButtonGroup>
                            </NavItem>
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}