import React from 'react';
import { connect } from 'react-redux';
import { Modal, ButtonGroup, Button, FormGroup } from 'react-bootstrap';
import TextInput from './generic/TextInput';
import { makeApiPost } from './../scripts/api'
import { updateToDo } from './../redux/reducers/board.reducer';
class ToDoCreationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoTitle: '',
      toDoText: '',
    }

    this.submitToDo = this.submitToDo.bind(this);
    this.handleToDoTextInput = this.handleToDoTextInput.bind(this);
    this.handleToDoTitleInput = this.handleToDoTitleInput.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // Reset text when modal closes
    if(nextProps.open === false) {
      if (nextState.toDoText !== '') this.setState({toDoText: ''});
      if (nextState.toDoTitle !== '') this.setState({toDoTitle: ''});
    }
  }

  handleToDoTextInput(e) { this.setState({toDoText: e.target.value}); }
  handleToDoTitleInput(e) { this.setState({toDoTitle: e.target.value}); }

  submitToDo() {
    let url = 'makeToDo/';
    url = `${url}?board=${this.props.boardName}`;
    url = `${url}&title=${this.state.toDoTitle}`;
    url = `${url}&text=${this.state.toDoText}`;
    makeApiPost(url)({
      success: (res) => {
        // Check if the response came back valid
        if (res.status === 201) {
          res.json().then((toDo) => {
            this.props.dispatch(updateToDo(toDo));
          }).catch(console.error);
        }
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
          <FormGroup>
            <TextInput
              title='Title'
              placeholder='Type The Title Here'
              value={this.state.toDoTitle}
              updateValue={this.handleToDoTitleInput}
            />
            <br/>
            <TextInput
              title='Task'
              placeholder='Type The Task Here'
              value={this.state.toDoText}
              updateValue={this.handleToDoTextInput}
            />
          </FormGroup>
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

export default connect()(ToDoCreationModal);
