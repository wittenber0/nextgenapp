import React, { Component } from 'react';
import MenuComponent from "./MenuComponent";
import '../css/NavComponent.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class NavComponent extends Component{

  componentWillMount(){
    this.openClass = "";
    this.setState({
      open: false
    });
  }

  toggleNav = () =>{
    if(this.state.open){
      this.openClass = "";
    }else{
      this.openClass = "open";
    }
    this.setState({open : !this.state.open});
  }

  start = () =>{
    window.location = '/';
    console.log("Starting");
    this.props.logs.push("Starting : " + (new Date()).getTime());
  }

  render(){
    /*
    <Button variant="outlined" color="secondary" className={"toggle-nav "+this.openClass} onClick={this.toggleNav}>
      Menu
    </Button>
    */
    return (
      <div className="nav-component">
        <Button variant="outlined" color="secondary" className={"toggle-nav "+this.openClass} onClick={this.start}>Home</Button>
        <h2 className="page-title">Next Gen Firewall Study</h2>
        <div className={"navbar "+this.openClass}>
          <MenuComponent toggleMethod={this.toggleNav}/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(NavComponent);
