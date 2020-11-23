import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";


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
  innerdiv: {
    alignContent: "center",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  submit: {
    display: "inline-block",
    alignContent: "center",
    alignText: "center",
    "& > *": {
      alignContent: "center",
      alignText: "center",
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  btn: {
    margin: theme.spacing(1),
  },
  outdiv: {
    height: "20vh",
    overflow: "scroll",
  },
}));

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};
const dayOfWeekChoice = ["MON", "TUE", "WED", "THU", "FRI"];
const checkInTimeChoice = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
];
const timeChoice = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];
const departmentTypeChoice = ["1", "2", "3", "4", "5", "6"];
const raceTypeChoice = ["1", "2", "3", "4", "5", "6"];
const genderTypeChoice = ["male", "female"];
let requestID = 1;
export const Employee = ({address,clientName,workFlowName}) => {
  const classes = useStyles();
  const [employeeID, setEmployeeID] = useState(1);
  const [deptType, setDeptType] = useState("1");
  const [gender, setGender] = useState("male");
  const [race, setRace] = useState("2");
  const [dayOfWeek, setDayOfWeek] = useState("MON");
  const [checkInDateTime, setCheckInDateTime] = useState("8:00");
  const [duration, setDuration] = useState("8");
  const [time, setTime] = useState("8:00");
  const [suspend, setSuspend] = useState(false);
  const [numRequest, setNumRequest] = useState(100);
  const [requestDuration, setRequestDuration] = useState(1000);
  
  // const [res, setRes] = useState([]);
 
  const handleDurationChange = (e) => {
      setDuration(e.target.value);
  };
  const handleEmployeeIdChange = (e) => {
    setEmployeeID(e.target.value);
  };
  const handleDeptTypeChange = (e) => {
    setDeptType(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleRaceChange = (e) => {
    setRace(e.target.value);
  };
  const handleDayOfWeekChange = (e) => {
    setDayOfWeek(e.target.value);
  };
  const handleDateTimeChange = (e) => {
    setCheckInDateTime(e.target.value);
  };
  const handleRequestDurationChange = (e) => {
    setRequestDuration(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleNumRequestChange = (e) => {
    setNumRequest(e.target.value);
    // console.log(numRequest);
  };
  useEffect(() => {
    async function makeRequest(){
    if(suspend){
      await axios
        .post(address+"/predict", {
          "requestID":requestID,
          "client_name": clientName ,
            "workflow": "employee",
            "data":{
          emp_id: employeeID,
          dept_type: deptType,
          gender: gender,
          race: race,
          day_of_week: dayOfWeek,
          duration: duration,
          checkin_datetime: checkInDateTime,
          time: time,
        }}).then(console.log({
          "requestID":requestID,
          "client_name": clientName ,
            "workflow": workFlowName,
            "data":{
          emp_id: employeeID,
          dept_type: deptType,
          gender: gender,
          race: race,
          day_of_week: dayOfWeek,
          duration: duration,
          checkin_datetime: checkInDateTime,
          time: time,
        }}))
        .catch((error) => {
          console.log(error);
        });
    }}
    makeRequest();
  }, [numRequest])
  const randomSet = () => {
    setEmployeeID(Math.floor(Math.random() * 50));
    setDeptType(departmentTypeChoice.sample());
    setGender(genderTypeChoice.sample());
    setRace(raceTypeChoice.sample());
    setDayOfWeek(dayOfWeekChoice.sample());
    setDuration(Math.floor(Math.random() * 8).toString());
    setCheckInDateTime(checkInTimeChoice.sample());
    setTime(timeChoice.sample());
  };

  const onStartBTNClick = async() => {
    setSuspend(true);
    let n = numRequest;
    while (n > 0) {
      randomSet();
      await new Promise((r) => setTimeout(r, requestDuration));
      n -= 1;
      requestID+=1;
      setNumRequest(n);
    }
    setSuspend(false);
  };

    return (
        <div>
            <div className={classes.innerdiv}>
          <TextField
            id="standard-basic"
            label="employee id"
            value={employeeID}
            onChange={handleEmployeeIdChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="department"
            value={deptType}
            onChange={handleDeptTypeChange}
            disabled={suspend}
          />
        </div>
        <div className={classes.innerdiv}>
          <TextField
            id="standard-basic"
            label="gender"
            value={gender}
            onChange={handleGenderChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="race"
            value={race}
            onChange={handleRaceChange}
            disabled={suspend}
          />
        </div>
        <div className={classes.innerdiv}>
          <TextField
            id="standard-basic"
            label="day of week"
            value={dayOfWeek}
            onChange={handleDayOfWeekChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="check in time"
            value={checkInDateTime}
            onChange={handleDateTimeChange}
            disabled={suspend}
          />
        </div>
        <div className={classes.innerdiv}>
          <TextField
            id="standard-basic"
            label="duration"
            value={duration}
            onChange={handleDurationChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="time"
            value={time}
            onChange={handleTimeChange}
            disabled={suspend}
          />
        </div>
        <TextField
          id="outlined-basic"
          label="request duration"
          variant="outlined"
          value={requestDuration}
          onChange={handleRequestDurationChange}
          disabled={suspend}
        />
        <TextField
          id="outlined-basic"
          label="number of requests"
          variant="outlined"
          value={numRequest}
          onChange={handleNumRequestChange}
          disabled={suspend}
        />

        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={onStartBTNClick}
          disabled={suspend}
        >
          start
        </Button>

        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={randomSet}
          disabled={suspend}
        >
          random pick
        </Button>
        </div>
    )
}
