import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { Route } from 'react-router-dom';
import FlowPage from './components/FlowPage';
import StartPage from './components/StartPage';

let logs=[];

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={()=>{return(<App logs={logs} />)}} />
      <Route path="/flows" component={()=>{return(<FlowPage logs={logs}></FlowPage>)}} />
      <Route path="/policies" component={FlowPage} />
      <Route exact path="/" component={()=>{return(<StartPage logs={logs}></StartPage>)}} />
    </div>
  </BrowserRouter>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
/*const Roster = () => (
  <div>
    <h2>This is a roster page!</h2>
    <Switch>
      <Route path='/RunningLog' component={RunningLogPage}/>
      <Route path='/SleepingLog' component={SleepingLogPage}/>
      <Route path='/' component={App}/>
    </Switch>
  </div>
)*/

serviceWorker.unregister();
