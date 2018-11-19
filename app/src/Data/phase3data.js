import phase2table from './phase2data';


let phase3table = {
  rows: [],
  data: []
}

for(var i =0; i<12; i++){
  phase3table.rows.push(phase2table.rows[i]);
}
phase3table.rows.push("Options");

for(var j=0; j<phase2table.data.length; j++){
  let dr = [];
  for(let i=0; i< 12; i++){
    dr.push(phase2table.data[j][i])
  }
  phase3table.data.push(dr);
}

export default phase3table;
