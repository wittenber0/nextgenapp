import React from 'react';
import PageWrapper from './PageWrapper';

class PhaseBreakPage extends React.Component{

  render(){
    return(
      <PageWrapper>
        <h2>Take a quick break!</h2>
        <p>You have finished phase {this.props.phase} of the study, press next to continue</p>
      </PageWrapper
    )
  }
}

export default PhaseBreakPage;
