import React,{useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from "@material-ui/core/styles";
import Loader from 'react-loader-spinner'
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
const nameMap = {"1":"data loader","2":"Linear regression","3":"SVM"};
const analyticsMap = {"12340":"/analytics_0","12341":"/analytics_1","12342":"/analytics_2",
                      "12343":"/analytics_3","12344":"/analytics_4","12345":"/analytics_5",
                    "12346":"/analytics_6","12347":"/analytics_7","12348":"/analytics_8","12349":"/analytics_9"}
const useStyles = makeStyles((theme) => ({
  root: {
     alignContent: "center",
    textAlign: "center",
    "& > *": {
      margin: "5px",
      width: "100ch",
    },
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  innerdiv: {
    display: "flex",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    "& > *": {
      margin: "5px",
      width: "20ch",
    },
  },lists:{
      marginLeft: "auto",
    marginRight: "auto",
      alignContent: "center",
      justifyContent: "center",
    textAlign: "center",
      maxWidth: 400,
  },submit: {
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
    "& > *": {
      justifyContent: "center",
      alignContent: "center",
      alignText: "center",
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
}));


export const NewWorkFlow = ({handleWorkFlowNameChange,
        handleClientNameChange,
        workFlowName,
        clientName,address,setAnalyticsAddress}) => {
    const classes = useStyles();
    const [isStart,setIsStart] = useState(false);
    const [isValid,setIsValid] = useState(true);
    const [launchNewContainer,setLaunchNewContainer] = useState(false);
    const [specification,setSpecification] = useState([]);
    const [visited,setVisited] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [placeHolder,setPlaceHolder] = useState("");
    
    const handlePlaceHolderChange = (e) => {
        setPlaceHolder(e.target.value);
    };
    const handleModeChange = (event) => {
      setLaunchNewContainer(event.target.checked);
    };
    
    const checkInPut = (input) =>{
        var set = new Set(["1","2","3"]); 
        let vis = new Set(visited);
        let temp = input.split(',');
        console.log(temp);
        let i = 0;
        for(;i<temp.length ;i++){
            console.log(temp[i]);
            if(!set.has(temp[i])){
                return false;
            }
            //check visited
            if(vis.has(temp[i])){
              return false;
            }else{
              vis.add(temp[i]);
            }
        }
        //update visited
        setVisited(Array.from(vis));
        return true;
    }
    const onAddBTNClick = async () => {
        setIsValid(true);
        if(checkInPut(placeHolder)){
            const temp = [...specification];
            temp.push(placeHolder);
            if(temp.length > 3){
                temp.shift();
            }
            setSpecification(temp);
            setPlaceHolder("");
        }else{
            setIsValid(false);
            setPlaceHolder("");
        }
    }
    const onSubmitBTNClick = async () => {
        let workflow_specification = [];
        var i;
        console.log(specification);
        for(i = 0;i < specification.length;i++){
            workflow_specification.push(specification[i].split(','));
        }
        let workflow = workFlowName==1? "employee":"hospital";
        console.log(workflow_specification);
        //TODO
        setIsLoading(true);
        let endpoint = (launchNewContainer===true)? address+"/noreuse/request":address+"/reuse/request";
        console.log(endpoint);
        await axios
        .post(endpoint,{client_name:clientName,
        workflow,
        workflow_specification
        },{timeout:250*1000})
        .then((res)=>{
            console.log(res);
            if(res.status === 200){
              const split = res.data.split(":");
              setAnalyticsAddress(`http://10.176.67.91${analyticsMap[split[1]]}`);
            }
        })
        .catch((error) => {
          console.log(error);
        });
        setIsLoading(false);
        setIsStart(true);
        console.log({client_name:clientName,
        workflow,
        workflow_specification
        })
    }

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.innerdiv}>
           
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={workFlowName}
                onChange={handleWorkFlowNameChange}
                disabled={isStart}
              >
                <MenuItem value={1}>employee</MenuItem>
                <MenuItem value={2}>hospital</MenuItem>
          </Select>
            <TextField
              id="standard-basic"
              label="client name"
              value={clientName}
              onChange={handleClientNameChange}
              disabled={isStart}
            />
            <FormControlLabel
                control={
                  <Checkbox
                    checked={launchNewContainer}
                    onChange={handleModeChange}
                    name="checked"
                    color="primary"
                  />
                }
                label="noreuse container"
              />
        </Grid>
        <Grid item xs={6} className={classes.submit}>
          <div>
          <TextField
            id="outlined-basic"
            label="next component"
            variant="outlined"
            value={placeHolder}
            onChange={handlePlaceHolderChange}
            disabled={isStart}
            error={!isValid}
            helperText={isValid? null:"Incorrect entry."}
          />
          </div>
          <div>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={onAddBTNClick}
            disabled={isStart}
          >
            ADD component
          </Button>
          </div>
          <div>
          {isLoading? <Loader
          type="Oval"
          color="#00BFFF"
          height={30}
          width={30}
          timeout={250000} 
        />:
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={onSubmitBTNClick}
            disabled={isStart}
          >
            Start workflow
          </Button>
          }</div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.lists}>
          <List className={classes.lists} alignItems="center">
              {specification.map((data,idx)=>(data? 
              <ListItem key={idx} dense>
                  <ListItemText
                  primary={data}
                  secondary={`${""+data.split(',').map((d,i)=>(nameMap[d] ? nameMap[d] : null))}`}
                  />
              </ListItem>:null
              ))}
          </List>
          </div>
        </Grid>
        <Grid item xs={12}>
          <h3>
          {isStart? `workflow : ${workFlowName} client : ${clientName} started`:null}
          </h3>
        </Grid>
        </Grid>
        </div>
    )
}
