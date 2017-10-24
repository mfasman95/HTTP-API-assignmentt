import React from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import { makeApiPost } from './../scripts/api';
import { updateToDo } from './../redux/reducers/board.reducer';

class ToDo extends React.Component {
  constructor(props) {
    super(props);

    const { title, text, completed, digest } = this.props.toDo;
    this.state = { title, text, completed, digest }

    this.toggleToDo = this.toggleToDo.bind(this);
  }

  toggleToDo() {
    let url = 'toggleToDo/';
    url = `${url}?board=${this.props.boardName}`;
    url = `${url}&digest=${this.state.digest}`;
    url = `${url}&state=${!this.state.completed}`;
    makeApiPost(url)({
      success: (res) => {
        // Check if the response came back valid
        if (res.status === 201) {
          res.json().then((toDo) => {
            // Update application state
            this.props.dispatch(updateToDo(toDo));
            
            // Update this component's state
            const { title, text, completed, digest } = toDo;
            this.setState({ title, text, completed, digest });
          }).catch(console.error);
        }
      },
      failure: console.error,
    });
  }

  render() {
    return (
      <Panel className='toDoItem'>
        <h3>{this.state.title || 'NO TITLE'}</h3>
        <p>{this.state.text}</p>
        <Button
          bsStyle={this.state.completed ? 'danger' : 'primary'}
          bsSize='small'
          onClick={this.toggleToDo}
        >
          { this.state.completed ? 'Mark Incomplete' : 'Mark Complete' }
        </Button>
      </Panel>
    )
  }
}

export default connect()(ToDo);
