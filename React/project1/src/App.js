import React from 'react';
import './App.css';
import Index from './antdDemo/index';
// import NoContext from './context/NoContext';
// import UseContext from './context/UseContext';
// import UseConsumerContext from './context/UseConsumerContext';
// import CustomTextInput from './ref/CustomTextInput';

function App() {
  return (
    <div className='App'>
      <Index />
      {/*<span>
        <NoContext/>
      </span>
      <span style={{marginLeft: 8}}>
        <UseContext/>
      </span>
      <span style={{ marginLeft: 8 }}>
        <UseConsumerContext />
      </span>
      <CustomTextInput />*/}
    </div>
  );
}

export default App;
