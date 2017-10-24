import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Col } from 'react-bootstrap';
import TextInput from './../generic/TextInput';

import { changePage } from './../../redux/reducers/router.reducer';
import { enterBoard } from './../../redux/reducers/board.reducer';
import { makeApiGet } from './../../scripts/api';

class Home extends React.Component {
  constructor(props){
    super(props);

    const url = new URL(window.location);
    const board = url.searchParams.get('board');

    this.state = { value: board || '' }

    if (this.state.value !== '') { this.submitBoard(); }

    this.handleBoardNameInput = this.handleBoardNameInput.bind(this);
    this.submitBoard = this.submitBoard.bind(this);
  }

  handleBoardNameInput(e){ this.setState({value: e.target.value}); }

  submitBoard(){
    makeApiGet(`getBoard/?board=${this.state.value}`)({
      success: (res) => {
        res.json().then((data) => {
          this.props.dispatch(enterBoard(data));
          this.props.dispatch(changePage('BOARD'));
        }).catch(console.error);
      },
      failure: console.error,
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome Home</h1>
        <Col xs={6} xsOffset={3}>
          <FormGroup>
            <TextInput
              title='Board Name'
              placeholder='Type The Board Name Here'
              value={this.state.value}
              updateValue={this.handleBoardNameInput}
              submit={this.submitBoard}
            />
          </FormGroup>
          <h3>Type In the Name Of A Board And Submit To View That Board's To Dos</h3>
        </Col>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => { return { } };

export default connect(mapStateToProps)(Home);