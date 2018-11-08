import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ManagementComponent from './ManagementComponent';

class StartPage extends Component{

  start = () => {
    //ManagementComponent.addLog("Starting");
    console.log("Starting");
  }

  render(){
    return(
      <PageWrapper>
        <Link to="/flows"><Button variant="contained">Start</Button></Link>
      </PageWrapper>
    )
  }
}

export default StartPage;
