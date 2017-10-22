import React from 'react';
import { connect } from 'react-redux';
import { Well, Col, Button } from 'react-bootstrap';
import ToDo from './../ToDo';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.addToDo = this.addToDo.bind(this);
  }

  addToDo() {
    console.log('ADD A TODO');
  }

  render() {
    const { name, toDos } = this.props.board;
    return (
      <div>
        <h1>Board <b>{name}</b></h1>
        <Col xs={10} xsOffset={1}>
          <Button
            bsStyle='success'
            bsSize='large'
            onClick={this.addToDo}
          >
            Add A To Do
          </Button>
          <br/>
          <br/>
          <Well>
            {
              Object.keys(toDos).length <= 0 && 
                <h3>There Are No To Dos On This Board!</h3>
            }
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
