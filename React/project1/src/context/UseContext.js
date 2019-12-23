import React from 'react';

const ButtonContext = React.createContext({
  backgroundColor: 'yellow',
  border: 0,
  height: 50,
  width: 100,
  borderRadius: 5,
  outline: 'none'
});
// 给Context起别名, 在调试工具中显示的名字
ButtonContext.displayName = 'MyDisplayName';

class Button extends React.Component {
  // 使用 public class fields 语法 挂载context
  static contextType = ButtonContext;

  render() {
    return <button style={this.context}>我是使用了context特性的按钮</button>;
  }
}
// 赋值给挂载在Class上的contextType
// Button.contextType = ButtonContext;

// 中间组件
const ButtonGroup = () => (
  <Button/>
);


export default class UseContext extends React.Component {
  render() {
    const theme = {
      backgroundColor: 'blue',
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
