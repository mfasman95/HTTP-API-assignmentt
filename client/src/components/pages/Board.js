import React from 'react';
import { connect } from 'react-redux';
import { Well, Col } from 'react-bootstrap';
import ToDo from './../ToDo';

class Board extends React.Component {
  render() {
    const { name, toDos } = this.props.board;
    console.log(this.props.board);
    return (
      <div>
        <h1>Board <b>{name}</b></h1>
        <Col xs={10} xsOffset={1}>
        <Well>
          {
            Object.keys(toDos).map((key, i) => 
              <ToDo toDo={toDos[key]} key={i}/>
            )
          }
        </Well>
        </Col>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => { 
  return { 
    board: state.board.board,
  }
};

export default connect(mapStateToProps)(Board);
