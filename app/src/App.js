import React, { Component } from 'react';
import './App.css';
import NavComponent from './components/NavComponent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavComponent logs={this.props.logs}/>
      </div>
    );
  }
}

export default App;
