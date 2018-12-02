import React from 'react';
import FlowData from '../Data/FlowData3';
import PageWrapper from './PageWrapper';
import TableComponent from './TableComponent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import DownloadLink from "react-download-link";

class SingleFlowComponent extends React.Component {
  constructor (props){
    super(props);
    this.state = {time: "", next: this.props.rowid+1, row: this.props.rowid, blocked: false, reason: "", peace: this.props.phaseswitch, phase: 1};
    if(this.props.phaseswitch){
      if(this.props.rowid < 8){
        this.state = {time: "", next: this.props.rowid+1, row: this.props.rowid, blocked: false, reason: "", peace: true, phase: 1};
      }else if(this.props.rowid < 16){
        this.state = {time: "", next: this.props.rowid+1, row: this.props.rowid, blocked: false, reason: "", peace: false, phase: 2};
      }else{
        this.state = {time: "", next: this.props.rowid+1, row: this.props.rowid-8, blocked: false, reason: "", peace: true, phase: 3};
      }
    }else{
      if(this.state.row <8){
        this.state = {time: "", next: this.props.rowid+1, row: this.props.rowid, blocked: false, reason: "", peace: false, phase: 1};
      }else if(this.state.row <16){
        this.state = {time: "", next: this.props.rowid+1, row: this.props.rowid, blocked: false, reason: "", peace: true, phase: 2};
      }else if(this.state.row >=16){
        this.state = {time: "", next: this.props.rowid+1, row: this.props.rowid-16, blocked: false, reason: "", peace: true, phase: 3};
      }
    }
  }

  setGUIText = () =>{

    if(this.props.phaseswitch){
      if(this.props.rowid < 8){
        this.setState({peace: true, phase: 1});
      }else if(this.props.rowid < 16){
        this.setState({peace: false, phase: 2});
      }else{
        this.setState({peace: true, phase: 3, row: this.props.rowid-8});
      }
    }else{
      if(this.state.row <8){
        this.setState({peace: false, phase: 1});
      }else if(this.state.row <16){
        this.setState({peace: true, phase: 2});
      }else if(this.state.row >=16){
        this.setState({peace: true, phase: 3, row: this.props.rowid-16});
      }
    }

  }

  generateRoute = () => {
    if(this.props.rowid === 7){
      return("phase2");
    }else if(this.props.rowid === 15){
      return("phase3");
    }else{
      return("/flow"+this.state.next);
    }
  }

  next = () => {
    this.setState({time: (new Date()).getTime()}, ()=>{
      this.props.logs.push(this.state);
      console.log(this.props.logs);
      this.setState({
        row: this.state.row +1,
        next: this.state.next +1,
        reason: "",
        blocked: false
      }, ()=>{
        this.setGUIText();
      });
    })

  }

  handleBlockSwitch = () =>{
    this.setState({
      blocked: !this.state.blocked
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  showHideGUI=()=>{
    if(this.state.peace){
      return(
        <div className="flow-gui-pane">
          <Divider />
          <h4>User interactions during the last 5 minutes</h4>
          <TableComponent rowheaders={["Clicks", "Key Strokes"]} rows={["User Action", "0-5 Seconds", "0-15 Seconds", "0-60 Seconds", "0-3 Minutes", "0-5 Minutes"]} data={[JSON.parse(FlowData.data[this.state.row][10]), JSON.parse(FlowData.data[this.state.row][11])]} logs={this.props.logs} options={false}/>
          <h4>GUI at time of network action</h4>
          <div>
          {FlowData.data[this.state.row][12].map((e, i) =>{
            return(<p key={i}>{e}</p>);
          })}
          </div>
        </div>
      )
    }
  }

  render(){
    if(this.props.rowid > 23){
      return(
        <PageWrapper>
          <h2>Done</h2>
          <DownloadLink filename="results.txt" exportFile={() => JSON.stringify(this.props.logs)}>Save</DownloadLink>
        </PageWrapper>)
    }
    return(
      <PageWrapper>
        <div className="page-contents">
          <div className="page-sub-title-div">
            <h2 className="page-sub-title">Flow Data Phase {this.state.phase}</h2>
          </div>
          <div className="flow-detail-pane">
          <h4>Flow Details</h4>
            <ul>
              <li>{FlowData.rows[0]}: {FlowData.data[this.state.row][0]}</li>
              <li>{FlowData.rows[1]}: {FlowData.data[this.state.row][1]}</li>
              <li>{FlowData.rows[2]}: {FlowData.data[this.state.row][2]}</li>
              <li>{FlowData.rows[3]}: {FlowData.data[this.state.row][3]}</li>
              <li>{FlowData.rows[4]}: {FlowData.data[this.state.row][4]}</li>
              <li>{FlowData.rows[5]}: {FlowData.data[this.state.row][5]}</li>
              <li>{FlowData.rows[6]}: {FlowData.data[this.state.row][6]}</li>
              <li>{FlowData.rows[7]}: {FlowData.data[this.state.row][7]}</li>
              <li>{FlowData.rows[8]}: {FlowData.data[this.state.row][8]}</li>
              <li>{FlowData.rows[9]}: {FlowData.data[this.state.row][9]}</li>
            </ul>
          </div>
          {this.showHideGUI()}
          <div className="policy-card">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={!this.state.blocked} onChange={this.handleBlockSwitch} aria-label="BlockSwitch" />
                }
                label={this.state.blocked ? 'Block' : 'Allow'}
              />
            </FormGroup>
            <TextField
            id="outlined-multiline-flexible"
            value={this.state.reason}
            onChange={this.handleChange('reason')}
            label="Reason for decision"
            multiline
            fullWidth
            margin="normal"
            variant="outlined"
            />
          </div>

          <Link to={this.generateRoute()}><Button variant="outlined" onClick={this.next}>Next</Button></Link>
        </div>
      </PageWrapper>
    )
  }
}

export default SingleFlowComponent;
