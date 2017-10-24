import React from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import { makeApiPost } from './../scripts/api';
import { updateToDo } from './../redux/reducers/board.reducer';

class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.toggleToDo = this.toggleToDo.bind(this);
  }

  toggleToDo() {
    let url = 'toggleToDo/';
    url = `${url}?board=${this.props.boardName}`;
    url = `${url}&digest=${this.props.toDo.digest}`;
    url = `${url}&state=${!this.props.toDo.completed}`;
    makeApiPost(url)({
      success: (res) => {
        // Check if the response came back valid
        if (res.status === 204) {
          let td = Object.assign({}, this.props.toDo);
          td.completed = !this.props.toDo.completed;
          this.props.dispatch(updateToDo(td));
        }
      },
      failure: console.error,
    });
  }

  render() {
    const { title, text, completed } = this.props.toDo;
    return (
      <Panel className='toDoItem'>
        <h3>{title || 'NO TITLE'}</h3>
        <p>{text}</p>
        <Button
          bsStyle={completed ? 'danger' : 'primary'}
          bsSize='small'
          onClick={this.toggleToDo}
        >
          { completed ? 'Mark Incomplete' : 'Mark Complete' }
        </Button>
      </Panel>
    )
  }
}

const mapStateToProps = (state, ownprops) => {
  return {
    toDo: state.board.board.toDos[ownprops.digest],
  }
}

export default connect(mapStateToProps)(ToDo);
