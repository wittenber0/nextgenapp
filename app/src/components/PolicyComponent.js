import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


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
      <Card>
        <CardContent>
          <p>Please describe policies you would make given the data in the box below</p>
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
          <Button variant="outlined" color="secondary" onClick={this.handlePolicy}>Submit Phase</Button>
        </CardContent>
      </Card>

    </div>
    );
  }
}

export default PolicyComponent;
