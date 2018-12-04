import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class StartPage extends Component{

  start = () => {

    console.log("Starting");
    this.props.logs.push((new Date()).getTime() +": Starting");
  }

  render(){
    return(
      <PageWrapper>
        <p>
          You will be presented with a number of data flows, broken up into multiple phases.
          Each flow will represent a single network traffic connection.
          You are tasked with choosing whether to categorize the traffic as malicious or legitimate,
          by either blocking or allowing the traffic, respectively.
          Take time to consider each piece of data presented within the flows.
          Please remember to add commentary in the form included below each flow to fill
          in your thoughts on which parts of the data were most useful for making your decision.
        </p>
        <p>
          You will notice that included with some of the flows is additional data not typically presented by firewalls.
          This data may include installation path, mouse clicks, keystrokes, and GUI information.
          The installation path represents the location where the application that sent the given
          traffic flow is installed on the host PC. The mouse clicks and keystrokes data are counts of
          the number of mouse clicks and keystrokes, respectively, made by the user in the specified timeframe,
          with time frames of 0-5 seconds, 0-15 seconds, 0-60 seconds, 0-3 minutes, 0-5 minutes.
        </p>
        <p>
          The GUI information is automatically generated by the application and captured at the time of a network flow.
          The text is presented in a hierarchical format; each hierarchy begins with a timestamp,
          and each line break represents a descendent of the previous hierarchy. The “Name”, “Class Name”,
          and “Class Text” fields are automatically populated by the application, and may not be clearly readable;
          please try to glean as much insight as possible from the GUI text, noting in the comment box any strengths
          or weaknesses you find while utilizing it.
        </p>
        <p>
          As a final note, the installation location and GUI text fields may be blank for some traffic representing inbound network flows,
          as opposed to outbound network flows
        </p>
        <Link to="/flow0"><Button variant="contained" onClick={this.start}>Start</Button></Link>
      </PageWrapper>
    )
  }
}

export default StartPage;
