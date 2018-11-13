import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


class PolicyComponent extends React.Component{
  state = {
    policies : ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handlePolicy = () => {
    this.props.submitPolicies(this.state.policies);
    this.setState({policies : ""})
  }

  render(){
    return(
    <div className="policy-card">
    <Paper>
      <h2>Policies</h2>
      <p>
      Please describe policies you would make given the data in the box below.
      Feel free to use any of the data above to generate policies.
      </p>
      <p>For example: "block firefox.exe" or
      "allow TCP on port 443"
      </p>
      <TextField
      id="outlined-multiline-flexible"
      value={this.state.policies}
      onChange={this.handleChange('policies')}
      label="Policies"
      multiline
      fullWidth
      margin="normal"
      variant="outlined"
      />
      <Button variant="outlined" color="secondary" onClick={this.handlePolicy}>Next Phase</Button>
      </Paper>
    </div>
    );
  }
}

export default PolicyComponent;
