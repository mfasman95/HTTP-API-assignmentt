import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './css/App.css';
import Router from './components/Router';
import { changePage } from './redux/reducers/router.reducer';

class App extends Component {
  constructor(props){
    super(props);

    this.goHome = this.goHome.bind(this);
  }

  goHome(){
    this.props.dispatch(changePage('HOME'));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={this.goHome}/>
          <h1 className="App-title">Shared To Do</h1>
        </header>
        <Router/>
      </div>
    );
  }
}

export default connect()(App);
