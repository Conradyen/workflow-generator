import React, { useState } from "react";
import "./App.css";
import {  makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import {NewWorkFlowModel} from "./component/newWorkFlowModel"
import {NewWorkFlow} from "./component/NewWorkFlow"
import {Result} from "./component/Result"
import Grid from '@material-ui/core/Grid';
import {Hospital} from "./component/Hospital";
import {Employee} from "./component/Employee";

const useStyles = makeStyles((theme) => ({
  root: {
    alignContent: "center",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
    },
  },
  address: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },

}));


function App() {
  const classes = useStyles();
  const [address, setAddress] = useState("http://10.176.67.91/workflow-manager");
  const [analyticsAddress, setAnalyticsAddress] = useState("http://10.176.67.91/analytics_0");
  const [clientName,setClientName] = useState("");
  const [workFlowName,setWorkFlowName] = useState(1);

  const handleAnalyticsAddressChange = (e) => {
      setAnalyticsAddress(e.target.value);
  };
  // const [res, setRes] = useState([]);
  const handleClientNameChange = (e) => {
      setClientName(e.target.value);
  };
  const handleWorkFlowNameChange = (e) => {
        setWorkFlowName(e.target.value);
  };

  const handleAddressChange = (e) => {
        setAddress(e.target.value);
  };
  return (
    <div className="App">
      <h2>Cloud Computing Demo</h2>
      <div className={classes.address}>
        <TextField
          id="standard-basic"
          label="address"
          value={address}
          onChange={handleAddressChange}
        />
        </div>
       <Grid container spacing={3}>
         <Grid item xs={6}>
      <NewWorkFlow address={address} 
      setAnalyticsAddress={setAnalyticsAddress} 
      handleWorkFlowNameChange={handleWorkFlowNameChange}
        handleClientNameChange={handleClientNameChange}
        workFlowName={workFlowName}
        clientName={clientName}/>
      </Grid>
       <Grid item xs={6}>
        {workFlowName===1 ? <Employee address={address}
                                    clientName={clientName}
                                    workFlowName={workFlowName}/>: 
                                    <Hospital address={address}
                                    clientName={clientName}
                                    workFlowName={workFlowName}/>}
      </Grid>
      
      <Grid item xs={12}>
      <Result analyticsAddress={analyticsAddress} handleAnalyticsAddressChange={handleAnalyticsAddressChange}/>
      </Grid>
      </Grid>
      
    </div>
  );
}

export default App;
