import React, { Component } from 'react';
import TableComponent from './TableComponent';
import PageWrapper from './PageWrapper';
import Button from '@material-ui/core/Button';

let tableRows = ["Flow Id","Time", "Host Id", "Source Ip", "Destination Ip", "Source Host", "Destination Host", "Source Port", "Destination Port", "Protocol", "Flags", "Options"];
let tableData = [[1,"2018-02-19 11:27:09", 4, "192.168.1.2", "192.168.1.1", "None", "None", 59197, 137, "UDP", "None"]];

class FlowPage extends Component{

  render(){
    return(
      <PageWrapper>
      <div>
        <div className="page-sub-title-div">
          <h2 className="page-sub-title">Flow Data</h2>
          <Button variant="outlined" color="secondary">Phase 1</Button>
          <Button variant="outlined" color="secondary">Phase 2</Button>
          <Button variant="outlined" color="secondary">Phase 3</Button>
        </div>
        <TableComponent rows={tableRows} data={tableData} options={true}/>
      </div>
      </PageWrapper>

    )
  }
}

export default FlowPage;
