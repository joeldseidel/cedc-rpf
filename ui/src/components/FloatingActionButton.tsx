import * as React from 'react';
import styled from "styled-components";

export interface FloatingActionButtonProps {
    handleClick() : void;
    icon : string
}

const FloatingActionButtonContainer = styled.div `
    position : fixed;
    bottom : 16px;
    right : 16px;
    border-radius : 50%;
    height : 3rem;
    width : 3rem;
    background-color : #212529;
    color : white;
    display : flex;
    flex-flow : column nowrap;
    justify-content : center;
    align-items : center;
`;

export class FloatingActionButton extends React.Component<FloatingActionButtonProps, {}> {
    constructor(props : FloatingActionButtonProps) {
        super(props);
    }
    render() {
        return (
            <FloatingActionButtonContainer onClick={this.props.handleClick}>
                <span className="material-icons">
                    { this.props.icon }
                </span>
            </FloatingActionButtonContainer>
        );
    }
}
