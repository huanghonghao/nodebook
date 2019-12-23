import React from 'react';

const ButtonContext = React.createContext({
  backgroundColor: 'yellow',
  border: 0,
  height: 50,
  width: 100,
  borderRadius: 5,
  outline: 'none'
});

/**
 * 消费组件
 * 和 contextType 的区别
 * contextType 只能在类组件中使用
 * 一个组件如果有多个 consumer ， contextType 只对其中一个有效，所以说，contextType 只能有一个
 */
class Button extends React.Component {
  render() {
    return (
      <ButtonContext.Consumer>
        {value => <button style={value}>我是使用了context特性的按钮</button>}
      </ButtonContext.Consumer>
    );
  }
}

const ButtonGroup = () => (
  <Button/>
);

export default class UseConsumerContext extends React.Component {
  render() {
    const theme = {
      backgroundColor: 'red',
      border: 0,
      height: 50,
      width: 100,
      borderRadius: 5,
      outline: 'none'
    };
    return (
      <ButtonContext.Provider value={theme}>
        <ButtonGroup/>
      </ButtonContext.Provider>
    );
  }
};
