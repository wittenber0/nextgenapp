import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';

class MenuComponent extends Component{
  render(){
    return(
      <div>
        <h2>Navigation</h2>
        <List>
          <ListItem button>Sign in</ListItem>
          <Link to='/settings' onClick={this.props.toggleMethod}><ListItem button>Settings</ListItem></Link>
          <Link to='/flows' onClick={this.props.toggleMethod}><ListItem button>Flows</ListItem></Link>
          <Link to='/policies' onClick={this.props.toggleMethod}><ListItem button>Policies</ListItem></Link>
        </List>
      </div>
    )
  }
}

export default MenuComponent;
