import React from 'react';
import TableComponent from './TableComponent';
import PageWrapper from './PageWrapper';
import PolicyComponent from './PolicyComponent';
import DownloadLink from "react-download-link";
import phase3table from '../Data/phase3data';
import phase2table from '../Data/phase2data';
import phase1table from '../Data/phase1data';

class FlowPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {phase: 1, rows : phase3table.rows, data : phase3table.data, options : true, done : false};
  }

  nextPhase = () => {

    if(this.state.phase === 3){
      this.setState({done : true});
      return;
    }else if(this.state.phase === 2){
      this.setState({
        phase : this.state.phase + 1,
        rows : phase2table.rows,
        data : phase2table.data
      });
      return;
    }
    this.setState({
      phase : this.state.phase + 1,
      rows : phase1table.rows,
      data : phase1table.data
    });

  }

  submitPolicies = (p) =>{
    this.props.logs.push((new Date()).getTime() + ": Policies Created : "+ p );
    this.nextPhase();
  }

  render(){

    if(!this.state.done){
      this.props.logs.push((new Date()).getTime()+": Phase "+this.state.phase);
      return(
        <PageWrapper>
        <div className="page-contents">
          <div className="page-sub-title-div">
            <h2 className="page-sub-title">Flow Data Phase {this.state.phase}</h2>
            <p>
            For each phase, inspect each flows listed below and decide whether or not each should be blocked from the network based on the information provided.
            While inspecting each network flow, vocalize the proccess that you are going through to ultimately make your decision, and inparticular indicate which
            piece or pieces of data led you to your conclusions.
            </p>
          </div>
          <TableComponent rows={this.state.rows} data={this.state.data} logs={this.props.logs} options={this.state.options}/>
          <PolicyComponent submitPolicies={this.submitPolicies}/>
        </div>
        </PageWrapper>
      )
    }else{
      return(
        <PageWrapper>
          <h2>Results</h2>
          {this.props.logs.map((l, i)=>{
            return(<p key={i}>{l}</p>);
          })}
          <DownloadLink filename="results.txt" exportFile={() => this.props.logs}>Save</DownloadLink>
        </PageWrapper>
      )
    }
  }
}

export default FlowPage;
