import React from 'react';
import FlowData from '../Data/FlowData3';
import PageWrapper from './PageWrapper';
import TableComponent from './TableComponent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DownloadLink from "react-download-link";

class SingleFlowComponent extends React.Component {
  constructor (props){
    super(props);
    if(this.props.phaseswitch){
      if(this.props.rowid < 8){
        this.state = {row: this.props.rowid, peace: true, phase: 1};
      }else if(this.props.rowid < 16){
        this.state = {row: this.props.rowid, peace: false, phase: 2};
      }else{
        this.state = {row: this.props.rowid-8, peace: true, phase: 3};
      }
    }else{
      if(this.state.row <8){
        this.state = {row: this.props.rowid, peace: false, phase: 1};
      }else if(this.state.row <16){
        this.state = {row: this.props.rowid, peace: true, phase: 2};
      }else if(this.state.row >=16){
        this.state = {row: this.props.rowid-16, peace: true, phase: 3};
      }
    }
    this.state.time = "";
    this.state.next = this.props.rowid+1;
    this.state.indicators = "";
    this.state.blocked = null;
    this.state.reason = "";
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
      this.setState({
        row: this.state.row +1,
        next: this.state.next +1,
        reason: "",
        blocked: null
      }, ()=>{
        this.refreshIndicators("indicator-button");
        this.refreshIndicators("blocker");
        this.setGUIText();
      });
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
          <h4>User interactions during the last 5 minutes</h4>
          <TableComponent rowheaders={["key strokes","clicks"]} rows={["User Action", "0-5 Seconds", "0-15 Seconds", "0-60 Seconds", "0-3 Minutes", "0-5 Minutes"]} saveIndicator={this.saveIndicator} data={[JSON.parse(FlowData.data[this.state.row][10]), JSON.parse(FlowData.data[this.state.row][11])]} logs={this.props.logs} options={false}/>
          <h4>GUI at time of network action</h4>
          <Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{"gui text"}</Button>
          <div>
          {FlowData.data[this.state.row][12].map((e, i) =>{
            return(<p key={i}>{e}</p>);
          })}
          </div>
        </div>
      )
    }
  }

  saveIndicator = (event) =>{
    let tar;
    if(event.target.children.length){
      tar = event.target.children[0];

    }else{
      tar = event.target;
    }
    this.toggleButton(tar, "indicator-button");
    this.setState({indicators: this.state.indicators + tar.innerHTML + "|"});
  }

  toggleButton = (tar, classes) =>{
    if(tar.parentElement.className === "MuiButtonBase-root-29 MuiButton-root-3 MuiButton-outlined-11 " + classes){
      this.setIndicator(tar.parentElement, classes);
    }else{
      this.unsetIndicator(tar.parentElement, classes);
    }
  }

  setIndicator = (tar, classes) => {
    tar.className = "MuiButtonBase-root-29 MuiButton-root-3 MuiButton-outlined-11 MuiButton-outlinedSecondary-13 " + classes;
  }

  unsetIndicator = (tar, classes) =>{
    tar.className = "MuiButtonBase-root-29 MuiButton-root-3 MuiButton-outlined-11 " + classes;
  }

  refreshIndicators = (classname) =>{
    let buttons = document.getElementsByClassName(classname);

    for(let i=0; i<buttons.length; i++){
      this.unsetIndicator(buttons[i], classname);
    }
  }

  block = (event) =>{
    this.refreshIndicators("blocker");
    let tar;
    if(event.target.children.length){
      tar = event.target.children[0];

    }else{
      tar = event.target;
    }
    this.toggleButton(tar, "blocker");
    this.setState({blocked: true});
  }

  unblock = (event) =>{
    this.refreshIndicators("blocker");
    let tar;
    if(event.target.children.length){
      tar = event.target.children[0];

    }else{
      tar = event.target;
    }
    this.toggleButton(tar, "blocker");
    this.setState({blocked: false});
  }

  continueGen = () =>{
    if(this.state.blocked === null){
      return(<p><i>block or allow to advance</i></p>);
    }else{
      return(
        <Link to={this.generateRoute()}><Button variant="outlined" onClick={this.next}>Continue</Button></Link>
      );
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
            <div className="flow-info-box">
              <div className="basic-flow-info"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[1]}</Button>{FlowData.data[this.state.row][1]}</div>
              <div className="basic-flow-info2"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[2]}</Button>{FlowData.data[this.state.row][2]}</div>
              <div className="basic-flow-info3"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[3]}</Button>{FlowData.data[this.state.row][3]}</div>
            </div>
            <div>
              <div className="basic-flow-info"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[6]}</Button>{FlowData.data[this.state.row][6]}</div>
              <div className="basic-flow-info2"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[5]}</Button>{FlowData.data[this.state.row][5]}</div>
              <div className="basic-flow-info3"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[4]}</Button>{FlowData.data[this.state.row][4]}</div>
            </div>
            <div>
              <div className="basic-flow-info"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[7]}</Button>{FlowData.data[this.state.row][7]}</div>
              <div className="basic-flow-info2"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[8]}</Button>{FlowData.data[this.state.row][8]}</div>
              <div className="basic-flow-info3"><Button className="indicator-button" variant="outlined" onClick={this.saveIndicator}>{FlowData.rows[9]}</Button>{FlowData.data[this.state.row][9]}</div>
            </div>
          </div>
          {this.showHideGUI()}

          <div className="policy-card">
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
          <Button className="blocker" variant="outlined" onClick={this.block}>Block</Button>
          <Button className="blocker" variant="outlined" onClick={this.unblock}>Allow</Button>
          <br />
          <br />
          {this.continueGen()}
        </div>
      </PageWrapper>
    )
  }
}

export default SingleFlowComponent;
