import React from 'react';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Board from './pages/Board';

console.log(process.env.NODE_ENV);

class Router extends React.Component {
  render() {
    switch(this.props.page) {
      case 'HOME': { return <Home/> }
      case 'BOARD': { return <Board/> }
      default: {
        return (
          <h3>404: Page {this.props.page} Not Found</h3>
        )
      }
    }
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => { return { page: state.route.page } };

export default connect(mapStateToProps)(Router);
