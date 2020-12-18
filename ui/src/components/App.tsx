import * as React from 'react';
import {Route, Switch} from 'react-router';
import {MainPage} from "./MainPage";
import {User} from "../types/User";
import {UserCredentials} from "../types/UserCredentials";
import {IGetUserAuthentication, UserRequest} from "../types/requests/UserRequest";

export interface AppProps {}

export interface AppState {
    currentUser? : User
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props : AppProps) {
        super(props);
        this.state = {
            currentUser : undefined
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleLogin(user : User) : void {
        this.setState({currentUser : user});
    }
    handleRegister(user : User) : void {
        this.setState({currentUser : user});
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' component={() => <MainPage currentUser={this.state.currentUser} handleLogin={this.handleLogin} handleRegister={this.handleRegister} />} />
                </Switch>
            </div>
        );
    }
}