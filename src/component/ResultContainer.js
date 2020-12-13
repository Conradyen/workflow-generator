import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display:"inline-flex",
    alignContent: "center",
    textAlign: "left",
    justifyContent:"center",
    width:"100%",
  },title:{
      margin: theme.spacing(1),
  },col:{
      margin: theme.spacing(1),
      width: "250px",
  }
  
}));


const parseResponseData = (id,data) =>{
    console.log(data);
  try{
    let dlIDX = -1;
    let lrIDX = -1;
    let svmIDX = -1;
    let recordCount = -1;
    let lrPred = -1;
    let svmPred = -1;
    for(let i = 0;i < data.length;i++){
        if(data[i].record_count){
            dlIDX = i;
            recordCount = data[i].record_count;
        }
        if(data[i].prediction_LR){
            lrIDX = i;
            lrPred = data[i].prediction_LR;
            console.log(lrPred);
        }
        if(data[i].pred){
            svmIDX = i;
            svmPred = data[i].pred;
        }
    }
    
    const dataLoaderTime = dlIDX!==-1? `${((data[dlIDX].end_time - data[dlIDX].start_time)*1000).toFixed(3)}`:"N/A";
    const logisticRegressionTime = lrIDX!==-1? `${((data[lrIDX].end_time - data[lrIDX].start_time)*1000).toFixed(3)}`:"N/A";
    const SVMTIme = svmIDX!== -1? `${((data[svmIDX].end_time - data[svmIDX].start_time)*1000).toFixed(3)}`:"N/A";
    const SVMResult = id === 1?  "N/A":`${Math.round(svmPred)}`;
    const LogisticRegressionResult = id === 1?  "N/A":`${lrPred}`;
    const record_Count = `${recordCount}`;
    return [dataLoaderTime,
        logisticRegressionTime,
        SVMTIme,
        record_Count,
        SVMResult,
        LogisticRegressionResult];
  }catch{
    return "wrong data format";
  }
}


export const ResultContainer = ({i,workFlowName,data}) => {
    const classes = useStyles();
    const [dataLoaderTime,
        logisticRegressionTime,
        SVMTIme,
        record_Count,
        SVMResult,
        LogisticRegressionResult] = parseResponseData(i,data);
        console.log()
    return (
        <>
             <div className={classes.root}>
                <h5>{i}</h5>
                <div className={classes.col}>
                    <h4 className={classes.title}>Data Loader</h4>
                    <div>{`Time spend (ms) : ${dataLoaderTime}`}</div>
                    {record_Count==="-1"? null:<div>{`Record Count: ${record_Count}`}</div>}
                </div>
                <div className={classes.col}>
                    <h4 className={classes.title}>Logistic Regression</h4>
                    <div>{`Time spend (ms) : ${logisticRegressionTime}`}</div>
                    {LogisticRegressionResult === "-1"? null:<div>{workFlowName===1? `Employee Exit Time : ${LogisticRegressionResult}`:
                    `Days in hospital : ${LogisticRegressionResult}`}</div>}
                </div>
                <div className={classes.col}>
                    <h4 className={classes.title}>SVM</h4>
                    <div>{`Time spend (ms) : ${SVMTIme}`}</div>
                    {SVMResult === "-1"? null: <div>{workFlowName===1? `Number of Employees : ${SVMResult}`:
                    `Number of Patient : ${SVMResult}`}</div>}
                </div>
          </div>
        </>
    )
}
