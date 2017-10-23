import React from 'react';
import { Modal, ButtonGroup, Button } from 'react-bootstrap';
import { makeApiPost } from './../scripts/api'
class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.submitToDo = this.submitToDo.bind(this);
  }

  submitToDo() {
    makeApiPost(`addToDo/?text=${this.state.toDoText}`)({
      success: (res) => {
        res.json().then((data) => {
          console.log(data);
        }).catch(console.error);
      },
      failure: console.error,
    });
    this.props.closeModal();
  }

  render() {
    return (
      <Modal show={this.props.open}>
        <Modal.Header>
          <Modal.Title>Add To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          To Do Form Goes Here
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button bsStyle='success' onClick={this.submitToDo}>Update</Button>
            <Button bsStyle='danger' onClick={this.props.closeModal}>Cancel</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default (ToDo);
