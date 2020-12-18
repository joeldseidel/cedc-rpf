import * as React from 'react';
import {Navbar} from 'react-bootstrap';
import {User} from "../types/User";

export interface UserDisplayProps {
    activeUser : User;
}

export class UserDisplay extends React.Component<UserDisplayProps, {}> {
    render() {
        const displayName = this.props.activeUser.firstName + " " + this.props.activeUser.lastName;
        return (
            <Navbar.Text>
                Signed in as: {displayName}
            </Navbar.Text>
        );
    }
}