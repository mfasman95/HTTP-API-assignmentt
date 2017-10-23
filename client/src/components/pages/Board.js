import React from 'react';
import { connect } from 'react-redux';
import { Well, Col, Button } from 'react-bootstrap';
import ToDo from './../ToDo';
import AddToDoModal from './../AddToDoModal';

class Board extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = { toDoModalOpen: false }

    // Bind functionality
    this.openToDoModal = this.openToDoModal.bind(this);
    this.closeToDoModal = this.closeToDoModal.bind(this);
  }

  // Open the to do submission modal
  openToDoModal() { this.setState({ toDoModalOpen: true }) }
  // Close the to do submission modal
  closeToDoModal() { this.setState({ toDoModalOpen: false }) }

  render() {
    const { name, toDos } = this.props.board;
    return (
      <div>
        <h1>Board <b>{name}</b></h1>
        <Col xs={10} xsOffset={1}>
          <Button
            bsStyle='success'
            bsSize='large'
            onClick={this.openToDoModal}
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
        <AddToDoModal
          closeModal={this.closeToDoModal}
          open={this.state.toDoModalOpen}
        />
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
