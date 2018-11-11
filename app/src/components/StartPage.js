import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class StartPage extends Component{

  start = () => {

    console.log("Starting");
    this.props.logs.push((new Date()).getTime() +": Starting");
  }

  render(){
    return(
      <PageWrapper>
        <Link to="/flows"><Button variant="contained" onClick={this.start}>Start</Button></Link>
      </PageWrapper>
    )
  }
}

export default StartPage;
