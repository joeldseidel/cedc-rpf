import * as React from 'react';
import {NavigationBar} from "./NavigationBar";
import {User} from "../types/User";
import {LoginModal} from "./LoginModal";
import {RegisterModal} from "./RegisterModal";
import {Container, Jumbotron} from "react-bootstrap";
import styled from "styled-components";
import {PostContainer} from "./PostContainer";
import {FloatingActionButton} from "./FloatingActionButton";
import {Post} from "../types/Post";
import {CreatePostModal} from "./CreatePostModal";
import {IGetPosts, PostRequest} from "../types/requests/PostRequest";

export interface MainPageProps {
    currentUser? : User
    handleLogin(user : User) : void;
    handleRegister(user : User) : void;
}

export interface MainPageState {
    showLoginModal : boolean;
    showRegisterModal : boolean;
    showCreatePostModal : boolean;
    posts : Post[]
}

const MainJumbotron = styled.div `
    height: 80vh;
    width: 100vw;
    background-image: url("assets/collegeville.jpeg");
    background-position: center bottom;
    background-size: cover;
`;

const MainTitle = styled.h1 `
    padding: 16px;
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 8rem;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.4);
    text-shadow: 2px 2px 2px rgba(0,0,0,0.6);
`;

export class MainPage extends React.Component<MainPageProps, MainPageState> {
    constructor(props : MainPageProps) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleToggleCreatePostModal = this.handleToggleCreatePostModal.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.state = {
            showLoginModal: false,
            showRegisterModal: false,
            showCreatePostModal : false,
            posts : []
        }
    }

    handleRegister(user : User){
        this.setState({showRegisterModal : false});
        this.props.handleRegister(user);
        this.fetchPosts();
    }

    handleLogin(user : User) {
        this.setState({showLoginModal : false});
        this.props.handleLogin(user);
        this.fetchPosts();
    }

    handleToggleCreatePostModal() {
        this.setState({showCreatePostModal : true});
    }

    handleCreatePost(){
        this.setState({showCreatePostModal : false});
        this.fetchPosts();
    }

    fetchPosts() {
        let postReq = new PostRequest();
        postReq.getPosts().then((postResponse => {
            let postRes = postResponse as IGetPosts;
            if(postRes.success && this.props.currentUser != undefined && this.props.currentUser.permissions.canView){
                this.setState({posts : postRes.posts});
            }
        }));
    }

    render(){
        let starredPosts : any[] = [];
        let generalPosts : any[] = [];
        this.state.posts.forEach((post) => {
            if(post.tag == "starred"){
                starredPosts.push(post);
            } else {
                generalPosts.push(post);
            }
        });
        return (
            <main>
                <NavigationBar currentUser={this.props.currentUser} handleToggleLoginModal={() => { this.setState({showLoginModal : !this.state.showLoginModal}); }} handleToggleRegisterModal = {() => { this.setState({showRegisterModal : !this.state.showRegisterModal}) }} />
                <MainJumbotron id="mainPageJumbo">
                    <MainTitle>CEDC Community Action Forum</MainTitle>
                </MainJumbotron>
                {
                    this.props.currentUser != undefined &&
                        <PostContainer posts={starredPosts} title="Starred Posts" currentUser={this.props.currentUser} />
                }
                {
                    this.props.currentUser != undefined &&
                        <PostContainer posts={generalPosts} title="General Posts" currentUser={this.props.currentUser} />
                }
                {
                    this.props.currentUser != undefined &&
                    <FloatingActionButton handleClick={this.handleToggleCreatePostModal} icon="add_circle_outline"/>
                }
                {
                    this.props.currentUser != undefined &&
                    <CreatePostModal
                        show={this.state.showCreatePostModal && this.props.currentUser.permissions.canPost }
                        handleCreatePost={this.handleCreatePost}
                        handleCancel={() => { this.setState({showCreatePostModal : false}) }}
                        currentUser={this.props.currentUser} />
                }
                <LoginModal show={this.state.showLoginModal} handleLogin={this.handleLogin} handleRegister={()=> {this.setState({showRegisterModal: true, showLoginModal : false})}} />
                <RegisterModal show={this.state.showRegisterModal} handleRegister={this.handleRegister} handleCancel={()=> {this.setState({showRegisterModal : false})}}/>

            </main>
        );
    }
}