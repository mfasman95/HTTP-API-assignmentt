import React from 'react';
import { Panel, Col } from 'react-bootstrap';

class ToDo extends React.Component {
  render() {
    return (
      <Panel>
        <h3>{this.props.toDo.title || 'NO TITLE'}</h3>
        <p>{this.props.toDo.text}</p>
      </Panel>
    )
  }
}

export default (ToDo);
