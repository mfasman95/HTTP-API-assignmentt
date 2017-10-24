import React from 'react';
import { connect } from 'react-redux';
import { Well, Col, Button, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ToDo from './../ToDo';
import AddToDoModal from './../AddToDoModal';

class Board extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      toDoModalOpen: false,
      viewAll: true,
    }

    // Bind functionality
    this.openToDoModal = this.openToDoModal.bind(this);
    this.closeToDoModal = this.closeToDoModal.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  // Open the to do submission modal
  openToDoModal() { this.setState({ toDoModalOpen: true }) }
  // Close the to do submission modal
  closeToDoModal() { this.setState({ toDoModalOpen: false }) }
  // Toggle whether or not to show completed tasks
  toggleView() { this.setState({ viewAll: !this.state.viewAll }); }

  render() {
    const { name, toDos } = this.props.board;
    let visibleToDos = [];
    const tdKeys = Object.keys(toDos);
    for (let i = 0; i < tdKeys.length; i++) {
      const td = toDos[tdKeys[i]];
      // If everything is being viewed, push all to visible
      if (this.state.viewAll) visibleToDos.push(td);
      // If only incomplete are being viewed, push only incomplete to visible
      else if (!td.completed) visibleToDos.push(td);
    }
    return (
      <div>
        <h1>Board <b>{name}</b></h1>
        <Col xs={10} xsOffset={1}>
          <ButtonGroup>
            <Button
              bsStyle='success'
              onClick={this.openToDoModal}
            >
              Add A To Do
            </Button>
            <Button
              bsStyle='warning'
              onClick={this.toggleView}
            >
              { this.state.viewAll ? 'Show Incomplete To Dos Only' : 'Show All To Dos' }
            </Button>
          </ButtonGroup>
          <br/>
          <br/>
          <InputGroup>
            <InputGroup.Addon>
              Share This Board With A Friend!
            </InputGroup.Addon>
            <FormControl
              id='board-url'
              className='text-center'
              type={'text'}
              defaultValue={`${window.location.origin}/?board=${name}`}
              disabled={true}
            />
            <InputGroup.Button>
              <CopyToClipboard text={`${window.location.origin}/?board=${name}`}>
                <Button bsStyle='success'>
                  <i className='fa fa-clipboard'/>
                </Button>
              </CopyToClipboard>
            </InputGroup.Button>
          </InputGroup>
          <br/>
          <Well className={(visibleToDos.length <= 0) ? '' : 'toDoWell'}>
            { visibleToDos.length <= 0 && <h3>There Are No To Dos On This Board!</h3> }
            { visibleToDos.map((td, i) => <ToDo digest={td.digest} boardName={name} key={i}/>) }
          </Well>
        </Col>
        <AddToDoModal
          closeModal={this.closeToDoModal}
          open={this.state.toDoModalOpen}
          boardName={name}
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
