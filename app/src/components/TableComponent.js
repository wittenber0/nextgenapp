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

  blockFlow = (id) => {
    console.log("block " + id);
  }

  insertBlockButton = (id)=>{
    if(this.props.options===true){
      return(<CustomTableCell><Button onClick={()=>{this.blockFlow(id)}}>Block</Button></CustomTableCell>)
    }
  }

  render(){
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
            {r.map((c, i)=>{
              return(<CustomTableCell key={i}>{c}</CustomTableCell>)
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
