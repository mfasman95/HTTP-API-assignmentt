import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, HelpBlock, Button, Col } from 'react-bootstrap';
import { changePage } from './../../redux/reducers/router.reducer';
import { makeApiGet, makeApiPost } from './../../scripts/api.js';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = { value: '' }

    this.HI_ListName = this.HI_ListName.bind(this);
    this.goToList = this.goToList.bind(this);
  }

  HI_ListName(e){
    this.setState({value: e.target.value}, ()=>{
      if(this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  goToList(){
    makeApiGet('getList')({
      success: (res) => {
        console.log('SUCCESS', res);
      },
      failure: (err) => {
        console.log('FAILURE', err);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome Home</h1>
        <Col xs={6} xsOffset={3}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                List Name
              </InputGroup.Addon>
              <FormControl
                type={'text'}
                value={this.state.value}
                onInput={this.HI_ListName}
                placeholder={'Type The List Name Here'}
              />
              <InputGroup.Button>
                <Button bsStyle='success' onClick={this.goToList}>
                  <i className='fa fa-arrow-right'/>
                </Button>
              </InputGroup.Button>
            </InputGroup>
            <HelpBlock>
              <h3>Type the name of a list above, then click the green arrow. If the list exists, you will see that list.  Otherwise, you will create a new list with the typed name.</h3>
            </HelpBlock>
          </FormGroup>
        </Col>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => { return { } };

export default connect(mapStateToProps)(Home);
