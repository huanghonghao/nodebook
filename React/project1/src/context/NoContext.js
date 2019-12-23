import React, { Component } from 'react';

const Button = (props) => (
    <button style={props.theme}>我是没有使用context特性的按钮</button>
);

const ButtonGroup = (props) => (
    <Button theme={props.theme} />
);

export default class NoContext extends Component {
    render() {
        const theme = {
            backgroundColor: 'green',
            border: 0,
            height: 50,
            width: 100,
            borderRadius: 5,
            outline: 'none'
        };
        return (
            <ButtonGroup theme={theme} />
        );
    }
}
