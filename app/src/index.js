import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Route } from 'react-router-dom';
import FlowPage from './components/FlowPage';
import StartPage from './components/StartPage';
import SingleFlowComponent from './components/SingleFlowComponent';
import PhaseBreakPage from './components/PhaseBreakPage';

let logs=[];
let phaseswitch = true;
if(Math.random() < 0.5){
  phaseswitch = false;
}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={()=>{return(<App logs={logs} />)}} />
      <Route path="/flows" component={()=>{return(<FlowPage logs={logs}></FlowPage>)}} />
      <Route path="/policies" component={FlowPage} />
      <Route path="/tutorial" component={Child2} />
      <Route path="/flow:flowid" component={Child} />
      <Route path="/phase2" component={()=>{return(<PhaseBreakPage logs={logs} phaseswitch={phaseswitch} phase={2}></PhaseBreakPage>)}} />
      <Route path="/phase3" component={()=>{return(<PhaseBreakPage logs={logs} phaseswitch={phaseswitch} phase={3}></PhaseBreakPage>)}} />
      <Route exact path="/" component={()=>{return(<StartPage logs={logs}></StartPage>)}} />
    </div>
  </BrowserRouter>
  , document.getElementById('root')
);

function Child({ match }) {
  return(<SingleFlowComponent rowid={parseInt(match.params.flowid)} phaseswitch={phaseswitch} logs={logs} tutorial={false}></SingleFlowComponent>);
}

function Child2({ match }) {
  return(<SingleFlowComponent rowid={0} phaseswitch={phaseswitch} logs={logs} tutorial={true}></SingleFlowComponent>);
}
