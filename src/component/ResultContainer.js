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
    if(id === 1 && data.length >= 3){
        dlIDX = 0;
        lrIDX = 1;
        svmIDX = 2;
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
  }catch{
    return "wrong data format";
  }
}


export const ResultContainer = ({i,workFlowName,data}) => {
    const classes = useStyles();
    const [dataLoaderTime,
        logisticRegressionTime,
        SVMTIme,
        SVMResult,
        LogisticRegressionResult] = parseResponseData(i,data);
    return (
        <>
             <div className={classes.root}>
                <h5>{i}</h5>
                <div className={classes.col}>
                    <h4 className={classes.title}>Data Loader</h4>
                    <div>{`Time spend (ms) : ${dataLoaderTime}`}</div>
                </div>
                <div className={classes.col}>
                    <h4 className={classes.title}>Logistic Regression</h4>
                    <div>{`Time spend (ms) : ${logisticRegressionTime}`}</div>
                    {LogisticRegressionResult === -1? null:<div>{workFlowName==="employee"? `Employee Exit Time : ${LogisticRegressionResult}`:
                    `Patient Exit Time : ${LogisticRegressionResult}`}</div>}
                </div>
                <div className={classes.col}>
                    <h4 className={classes.title}>SVM</h4>
                    <div>{`Time spend (ms) : ${SVMTIme}`}</div>
                    {SVMResult === -1? null: <div>{workFlowName==="employee"? `Number of Employees : ${SVMResult}`:
                    `Number of Patient : ${SVMResult}`}</div>}
                </div>
          </div>
        </>
    )
}
