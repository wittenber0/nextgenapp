import React from 'react';
import PageWrapper from './PageWrapper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class PhaseBreakPage extends React.Component{

  start = () => {
    this.props.logs.push((new Date()).getTime() + ": Phase" + this.props.phase);
  }

  render(){
    let row;
    if(this.props.phase === 3){
      row = 16
    }else{
      row = 8
    }
    return(
      <PageWrapper>
        <h2>Take a quick break!</h2>
        <p>You have finished phase {this.props.phase} of the study, press next to continue</p>
        <Link to={"/flow"+row}><Button variant="contained" onClick={this.start}>Next</Button></Link>
      </PageWrapper>
    )
  }
}

export default PhaseBreakPage;
