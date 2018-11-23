import React from 'react';
import TextField from '@material-ui/core/TextField';
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
      In the box below please describe what information from the above table most heavily influenced your decisions,
      and write down any policies or rules that you would create from the information available to systematically block malicious traffic in the future.
      </p>
      <p>For example rules or policies could look like: "block firefox.exe" or
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
