import React, { Component } from 'react';

class ManagementComponent extends Component{
  constructor(props){
    super(props);
    this.logs = [];
  }

  addLog = (l) => {
    this.logs.push(l);
  }

}

export default ManagementComponent;
