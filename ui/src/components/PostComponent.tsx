import * as React from 'react';
import styled from "styled-components";
import {Card} from "react-bootstrap";

export interface PostComponentProps {
    title : string;
    creator : string;
}

export interface PostComponentState {

}

export class PostComponent extends React.Component<PostComponentProps, PostComponentState> {
    constructor(props : PostComponentProps) {
        super(props);
    }
    render() {
        return (
            <Card style={{width : "18rem"}}>
                <Card.Img variant="top"/>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>By {this.props.creator}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}