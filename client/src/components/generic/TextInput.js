import React from 'react';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Board from './pages/Board';

/**
 * @class TextInput
 * @extends {React.Component}
 * 
 * @prop title - The title of the input field
 * @prop placeholder - The placeholder text for the input field
 * @prop value - The value that's being maintained in the parent component
 * @prop updateValue - The function that's called to update the value associated with this text field
 * @prop submit - The function that's called when the input is submitted
 */
class TextInput extends React.Component {
  render() {
    return(
      <InputGroup>
        <InputGroup.Addon>
          { this.props.title }
        </InputGroup.Addon>
        <FormControl
          type={'text'}
          value={this.props.value}
          onInput={this.props.updateValue}
          placeholder={this.props.placeholder}
        />
        <InputGroup.Button>
          <Button bsStyle='success' onClick={this.props.submit}>
            <i className='fa fa-arrow-right'/>
          </Button>
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

export default connect(TextInput);
