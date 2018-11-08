import React, { Component } from 'react';
import TableComponent from './TableComponent';
import PageWrapper from './PageWrapper';
import Button from '@material-ui/core/Button';
import ManagementComponent from "./ManagementComponent";

let tableRows = ["Flow Id","Time", "Host Id", "Source Ip", "Destination Ip", "Source Host", "Destination Host", "Source Port", "Destination Port", "Protocol", "Flags", "Options"];
let tableData = [[1,"2018-02-19 11:27:09", 4, "192.168.1.2", "192.168.1.1", "None", "None", 59197, 137, "UDP", "None"],[2,"2018-02-20 11:27:09", 5, "192.168.1.6", "192.168.1.1", "None", "None", 80, 80, "TCP", "None"]];

class FlowPage extends Component{

  constructor(props){
    super(props);
    this.state = {phase: 1, rows : tableRows, data : tableData};
  }

  nextPhase = () => {

    if(this.state.phase === 3){
      return;
    }
    this.setState({
      phase : this.state.phase + 1,
      rows : ["Flow Id","Time", "Host Id", "Source Ip", "Destination Ip", "Source Host", "Destination Host", "Source Port", "Destination Port", "Protocol", "Flags", "Extra", "Options"],
      data : [[1,"2018-07-19 11:27:09", 4, "192.168.1.8", "192.168.1.1", "None", "None", 59197, 137, "UDP", "None", "GUI Text"],[2,"2018-02-20 11:27:09", 5, "192.168.1.6", "192.168.1.1", "None", "None", 80, 80, "TCP", "None", "GUI Text"]]
    });

  }

  render(){
    //ManagementComponent.addLog("Phase " + this.state.phase);
    console.log("Phase " + this.state.phase);
    return(
      <PageWrapper>
      <div>
        <div className="page-sub-title-div">
          <h2 className="page-sub-title">Flow Data Phase {this.state.phase}</h2>
          <Button variant="outlined" color="secondary" onClick={this.nextPhase}>Next Phase</Button>
        </div>
        <TableComponent rows={this.state.rows} data={this.state.data} options={true}/>
      </div>
      </PageWrapper>

    )
  }
}

export default FlowPage;
