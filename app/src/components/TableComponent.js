import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class TableComponent extends Component{

  refreshButtons = () =>{
    let buttons = document.getElementsByClassName("option-button");

    for(let i=0; i<buttons.length; i++){
      this.setUnblocked(buttons[i]);
    }
  }

  blockFlow = (id, e) => {
    if(e.target.nodeName === "SPAN"){
      e.target = e.target.parentElement;
    }

    if(e.target.firstChild.innerHTML === "Block"){
      this.setBlocked(e.target);
      console.log("block " + id);
      this.props.logs.push((new Date()).getTime()+": Blocked "+id);
    }else{
      this.setUnblocked(e.target);
      console.log("unblock " + id);
      this.props.logs.push((new Date()).getTime()+": Unblocked "+id);
    }
  }

  setBlocked = (tar) => {
    tar.firstChild.innerHTML = "Blocked";
    tar.className = "MuiButtonBase-root-29 MuiButton-root-3 MuiButton-outlined-11 MuiButton-outlinedSecondary-13 option-button";
  }

  setUnblocked = (tar) =>{
    tar.firstChild.innerHTML = "Block";
    tar.className = "MuiButtonBase-root-29 MuiButton-root-3 MuiButton-outlined-11 option-button";
  }

  insertBlockButton = (id)=>{
    if(this.props.options===true){
      return(<CustomTableCell><Button className="option-button" variant="outlined" onClick={(e)=>{this.blockFlow(id, e)}}>Block</Button></CustomTableCell>)
    }
  }

  insertRowHeader = (row) =>{
    if(this.props.rowheaders){
      return(<CustomTableCell>{this.props.rowheaders[row]}</CustomTableCell>);
    }
  }

  render(){
    this.refreshButtons();
    return(
      <Paper>
      <Table>
        <TableHead>
          <TableRow>
          {this.props.rows.map((r, i)=>{
            return (<CustomTableCell key={i}>{r}</CustomTableCell>);
          })}
          </TableRow>
        </TableHead>
        <TableBody>
        {this.props.data.map((r, i)=>{
          return(
            <TableRow key={i}>
            {this.insertRowHeader(i)}
            {r.map((c, i2)=>{
              return(<CustomTableCell key={i2}>{c}</CustomTableCell>)
            })}
            {this.insertBlockButton(r[0])}
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(TableComponent);
