import React, { Component } from 'react';
import { LayoutButton } from 'react-viewerbase';

class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCell: {   
        className: 'hover',                
        col: 1,             
        row: 1,
      },
    };
  }

  render() {
    return (
        <>              
            <LayoutButton                        
                selectedCell={this.state.selectedCell}
                onChange={cell => this.setState({ selectedCell: cell })}
            />       
        </>    
    );   
  }
}

export default Viewer;