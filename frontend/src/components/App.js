// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    
    const { children, Menu } = this.props;
    if(Menu == null){
      return (
        <div className="App">
         {children}
         
      
        </div>
      );
    }
    
    return (
      <div className="App">
         {children}
      </div>
    );
  }
}

//export default App;

export default connect(state => ({}), null)(App);