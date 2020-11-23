import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { ResultContainer } from './ResultContainer';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },outdiv: {
    alignContent: "center",
    textAlign: "left",
    height: "70vh",
    overflow: "scroll",
    width:"100%"
  },text:{
    color:"#f4f4f4",
    width:"400px"
  }
}));

// const nameMap = {"2":"Linear regression",
//                 "3":"SVM",
//               "1":"Data Loader"}

const parseResponseData = (data) =>{
    console.log(data);
  
    let ret = "Elapsed Time(ms) ->";
    let dlIDX = 0;
    let lrIDX = 0;
    let svmIDX = 0;
    let lrPred = -1;
    let svmPred = -1;
    for(let i = 0;i < data.length;i++){
        if(data[i].rec_count){
            dlIDX = i;
        }
        if(data[i].prediction_LR){
            lrIDX = i;
            lrPred = data[i].prediction_LR;
        }
        if(data[i].pred){
            svmIDX = i;
            svmPred = data[i].pred;
        }
    }
     const dataLoaderTime = `${((data[dlIDX].end_time - data[dlIDX].start_time)*1000).toFixed(3)}`;
    const logisticRegressionTime =  `${((data[lrIDX].end_time - data[lrIDX].start_time)*1000).toFixed(3)}`;
    const SVMTIme = `${((data[svmIDX].end_time - data[svmIDX].start_time)*1000).toFixed(3)}`;
    const SVMResult =  `${Math.round(svmPred)} `;
    const LogisticRegressionResult = `${lrPred}`;
    return [dataLoaderTime,
        logisticRegressionTime,
        SVMTIme,
        SVMResult,
        LogisticRegressionResult];

}

export const Result = ({analyticsAddress,handleAnalyticsAddressChange}) =>{
  const classes = useStyles();
  const [res, setRes] = useState([]);
  const [wfname,setwfname] = useState("");
  const [client,setClient] = useState("");
  const onRefreshBTNClick = async () => {
      await axios
        .get(analyticsAddress+"/get_result")
        .then((response) => {
          console.log(response.data.payload);
          let temp = [...response.data.payload];
          setRes(temp);
        })
        .catch((error) => {
          console.log(error);
        });
      // await new Promise((r) => setTimeout(r, 1000));
  };

  const onGetNameBTNClick = async () => {
      console.log(analyticsAddress);
      await axios
        .get(analyticsAddress+"/get_name")
        .then((response) => {
          console.log(response.data);
          setwfname(response.data.workflowname);
          setClient(response.data.clientname);
        })
        .catch((error) => {
          console.log(error);
        });
      // await new Promise((r) => setTimeout(r, 1000));
  };
  //handle null value

  return (
    <>
      <h3>{wfname&&client? `workflow name : ${wfname} | client name : ${client}`:null}</h3>
      <div className={classes.root}>
        <Button variant="contained" onClick={onGetNameBTNClick}>name</Button>
        <Button variant="contained" onClick={onRefreshBTNClick}>refresh</Button>
        <div className={classes.address}>
        <TextField
          id="standard-basic"
          label="analytics address"
          value={analyticsAddress}
          onChange={handleAnalyticsAddressChange}
          className={classes.text}
        />
      </div></div>
      <div className={classes.outdiv}>
        {res.map((data, idx) => (
          <>{<ResultContainer key={idx} i={data.requestID} workFlowName={wfname} data={data.analytics}/>}</>
        ))}
      </div>
      
    </>
  );
}

// export default Result;
