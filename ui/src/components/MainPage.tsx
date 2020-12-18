import * as React from 'react';
import {NavigationBar} from "./NavigationBar";
import {User} from "../types/User";
import {LoginModal} from "./LoginModal";
import {RegisterModal} from "./RegisterModal";
import styled from "styled-components";
import {PostContainer} from "./PostContainer";
import {FloatingActionButton} from "./FloatingActionButton";
import {Post} from "../types/Post";
import {CreatePostModal} from "./CreatePostModal";
import {IGetPosts, PostRequest} from "../types/requests/PostRequest";
import {Button} from "react-bootstrap";

export interface MainPageProps {
    currentUser : User | undefined;
    handleLogin(user : User) : void;
    handleRegister(user : User) : void;
}

export interface MainPageState {
    showLoginModal : boolean;
    showRegisterModal : boolean;
    showCreatePostModal : boolean;
    starredPosts : Post[];
    generalPosts : Post[];
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
        this.fetchPosts = this.fetchPosts.bind(this);
        this.state = {
            showLoginModal: false,
            showRegisterModal: false,
            showCreatePostModal : false,
            starredPosts : [],
            generalPosts : []
        }
    }

    handleRegister(user : User){
        this.props.handleRegister(user);
        this.setState({showRegisterModal : false});
    }

    handleLogin(user : User) {
        this.props.handleLogin(user);
        this.setState({showLoginModal : false});
    }

    handleToggleCreatePostModal() {
        this.setState({showCreatePostModal : true});
    }

    handleCreatePost(){
        this.setState({showCreatePostModal : false});
        this.fetchPosts();
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        let postReq = new PostRequest();
        postReq.getPosts().then((postResponse) => {
            let postRes = postResponse as IGetPosts;
            if(postRes.success){
                let starredPosts : Post[] = [];
                let generalPosts : Post[] = [];
                for(let i = 0; i < postRes.posts.length; i++){
                    if(postRes.posts[i].tag == "starred"){
                        starredPosts.push(postRes.posts[i]);
                    } else {
                        generalPosts.push(postRes.posts[i]);
                    }
                }
                this.setState({generalPosts : generalPosts, starredPosts : starredPosts});
            }
        });
    }

    render(){
        return (
            <main>
                <NavigationBar currentUser={this.props.currentUser} handleToggleLoginModal={() => { this.setState({showLoginModal : !this.state.showLoginModal}); }} handleToggleRegisterModal = {() => { this.setState({showRegisterModal : !this.state.showRegisterModal}) }} />
                <MainJumbotron id="mainPageJumbo">
                    <MainTitle>Collegeville Main Street Revitalization Project Forum</MainTitle>
                    <div style={{backgroundColor : "white", color : "white"}} >sahfkjlgvndsfghkjdsbjnsdkfbdhsflfgyhksdhfghsdfugholsdhfugkhsdfhglidsfhglhdskflughldsfhgjdljkfghldohfgkjdsfgkhdsfbgkljdhfgdsjkfhgkfjhgkjldsbfgjkhdsfg</div>
                </MainJumbotron>
                {
                    this.props.currentUser != undefined &&
                        <PostContainer posts={this.state.starredPosts} title="Starred Posts" currentUser={this.props.currentUser} />
                }
                {
                    this.props.currentUser != undefined &&
                        <PostContainer posts={this.state.generalPosts} title="General Posts" currentUser={this.props.currentUser} />
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