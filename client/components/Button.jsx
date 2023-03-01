import React, { Component } from 'react';

class Button extends Component {
  render () {
    return (
      <button>
        {this.props.action}
      </button>
    )
  }
}

export default Button;