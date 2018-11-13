import React, { Component } from 'react';
import TableComponent from './TableComponent';
import PageWrapper from './PageWrapper';
import Button from '@material-ui/core/Button';
import PolicyComponent from './PolicyComponent';
import DownloadLink from "react-download-link";

let tableRows = ["Flow Id","Time", "Host Id", "Source Ip", "Destination Ip", "Source Host", "Destination Host", "Source Port", "Destination Port", "Protocol", "Flags", "Path", "Options"];
let tableData = [[1,"2018-02-19 11:27:09", 4, "192.168.1.2", "192.168.1.1", "None", "None", 59197, 137, "UDP", "None", "None"],[2,"2018-02-20 11:27:09", 5, "192.168.1.6", "192.168.1.1", "None", "None", 80, 80, "TCP", "microsoftword.exe", "None"]];

class FlowPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {phase: 1, rows : tableRows, data : tableData, options : true, done : false};
  }

  nextPhase = () => {

    if(this.state.phase === 3){
      this.setState({done : true});
      return;
    }
    this.setState({
      phase : this.state.phase + 1,
      rows : ["Flow Id","Time", "Host Id", "Source Ip", "Destination Ip", "Source Host", "Destination Host", "Source Port", "Destination Port", "Protocol", "Flags", "Extra", "Options"],
      data : [[3,"2018-07-19 11:27:09", 4, "192.168.1.8", "192.168.1.1", "None", "None", 59197, 137, "UDP", "None", "GUI Text"],[4,"2018-02-20 11:27:09", 5, "192.168.1.6", "192.168.1.1", "None", "None", 80, 80, "TCP", "None", "GUI Text"]]
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
