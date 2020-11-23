import React,{useState,useEffect} from 'react'
import {  makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const hospital_expire_flag = [1, 2]
const insuranceChoice = [1, 2, 3, 4, 5]
const day = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
const durationChoice = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
const checkin_time = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00",
                         "06:30","07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
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
      width: "20ch",
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

const randomUniform = (min,max) =>{
  return (Math.random() * (max - min) + min);
}

/*
hadm_id = i
hospital_expire_flag = random.choice(hospital_expire_flag1)
insurance = random.choice(insurance1)
duration = random.choice(duration1)
num_in_icu = random.uniform(0.142857143, 1)
amount = random.uniform(-0.013434843, 1)
rate = random.uniform(0, 1)
total_items = random.uniform(0.093117409, 1)
value = random.uniform(0.000110609, 1)
dilution_value = random.uniform(0, 1)
abnormal_count = random.uniform(0.001908852, 1)
item_distinct_abnormal = random.uniform(0.059405941, 1)
checkin_datetime = random.choice(checkin_time1)
day_of_week = random.choice(day1)
*/

let requestID = 1;
export const Hospital = ({address,clientName,workFlowName}) => {
  const classes = useStyles();
  const [patientID,setPatient] = useState(1);
  const [hospitalFlag,setHospitalFlag] = useState(1);
  const [insurance,setInsurance] = useState(1)
  const [duration,setDuration] = useState("8");
  const [numInICU,setNumInICU] = useState(0.5);
  const [amount,setAmount] = useState(0);
  const [rate,setRate] = useState(0.5);
  const [totalItems,setTotalItems] = useState(0.5);
  const [value,setValue] = useState(0.5);
  const [dilutionValue,setDilutionValue] = useState(0.5);
  const [abnormalCount,setAbnormalCount] = useState(0.5);
  const [itemDistinctAbnormal,setItemDistinctAbnormal] = useState(0.5);
  const [checkInDateTime,setCheckInDateTime] = useState(checkin_time[0]);
  const [dayOfWeek,setDayOfWeek] = useState(day[0]);
  const [time, setTime] = useState("8:00");
  const [suspend, setSuspend] = useState(false);
  const [numRequest, setNumRequest] = useState(100);
  const [requestDuration, setRequestDuration] = useState(1000);

  const handleNumRequestChange = (e) => {
    setNumRequest(e.target.value);
    // console.log(numRequest);
  };
  const handleRequestDurationChange = (e) => {
    setRequestDuration(e.target.value);
  };
  const handlePatientIdChange = (e) =>{
    setPatient(e.target.value);
  }
  const handleHospitalFlagChange = (e) =>{
    setHospitalFlag(e.target.value);
  }
  const handleInsuranceChange = (e) =>{
    setInsurance(e.target.value);
  }
  const handleDurationChange = (e) => {
        setDuration(e.target.value);
  };
  const handleNumInICUChange = (e) => {
        setNumInICU(e.target.value);
  };
  const handleAmountChange = (e) => {
      setAmount(e.target.value);
  };
  const handleRateChange = (e) => {
      setRate(e.target.value);
  };
  const handleTotalItemsChange = (e)=>{
    setTotalItems(e.target.value);
  }
  const handleValueChange = (e)=>{
    setValue(e.target.value);
  }
  const handleDilutionValueChange = (e) =>{
    setDilutionValue(e.target.value);
  }
  const handleAbnormalCountChange = (e) => {
    setAbnormalCount(e.target.value);
  }
  const handleItemDistinctAbnormalChange = (e) =>{
    setItemDistinctAbnormal(e.target.value);
  }
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDayOfWeekChange = (e) => {
    setDayOfWeek(e.target.value);
  };
  const handleDateTimeChange = (e) => {
    setCheckInDateTime(e.target.value);
  };

   useEffect(() => {
    async function makeRequest(){
    if(suspend){
      await axios
        .post(address+"/predict", {
          "requestID":requestID,
          "client_name": clientName ,
            "workflow": "hospital",
            "data":{
          hadm_id :patientID,
          hospital_expire_flag :hospitalFlag,
          insurance :insurance,
          duration :duration,
          num_in_icu :numInICU,
          amount :amount,
          rate :rate,
          total_items :totalItems,
          value :value,
          dilution_value :dilutionValue,
          abnormal_count :abnormalCount,
          item_distinct_abnormal :itemDistinctAbnormal,
          checkin_datetime :checkInDateTime,
          day_of_week :dayOfWeek,
        }}).then(console.log( {
          "requestID":requestID,
          "client_name": clientName ,
            "workflow": "hospital",
            "data":{
          hadm_id :patientID,
          hospital_expire_flag :hospitalFlag,
          insurance :insurance,
          duration :duration,
          num_in_icu :numInICU,
          amount :amount,
          rate :rate,
          total_items :totalItems,
          value :value,
          dilution_value :dilutionValue,
          abnormal_count :abnormalCount,
          item_distinct_abnormal :itemDistinctAbnormal,
          checkin_datetime :checkInDateTime,
          day_of_week :dayOfWeek,
        }}))
        .catch((error) => {
          console.log(error);
        });
    }}
    makeRequest();
  }, [numRequest])


  const randomSet = () => {
    setPatient(Math.floor(Math.random() * 1000));
    setHospitalFlag(hospital_expire_flag.sample());
    setInsurance(insuranceChoice.sample());
    setDuration(durationChoice.sample());
    setNumInICU(randomUniform(0.142857143, 1));
    setAmount(randomUniform(-0.013434843, 1));
    setRate(randomUniform(0, 1));
    setTotalItems(randomUniform(0.093117409, 1));
    setValue(randomUniform(0.000110609, 1));
    setDilutionValue(randomUniform(0, 1));
    setAbnormalCount(randomUniform(0.001908852, 1));
    setItemDistinctAbnormal(randomUniform(0.059405941, 1));
    setCheckInDateTime(checkin_time.sample());
    setDayOfWeek(day.sample());
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
            label="patient id"
            value={patientID}
            onChange={handlePatientIdChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="hospital flag"
            value={insurance}
            onChange={handleInsuranceChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="insurance"
            value={hospitalFlag}
            onChange={handleHospitalFlagChange}
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
            label="number in ICU"
            value={numInICU}
            onChange={handleNumInICUChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="amount"
            value={amount}
            onChange={handleAmountChange}
            disabled={suspend}
          />
        </div>
        <div className={classes.innerdiv}>
          <TextField
            id="standard-basic"
            label="rate"
            value={rate}
            onChange={handleRateChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="total items"
            value={totalItems}
            onChange={handleTotalItemsChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="value"
            value={value}
            onChange={handleValueChange}
            disabled={suspend}
          />
        </div>
        <div className={classes.innerdiv}>
          <TextField
            id="standard-basic"
            label="dilution value"
            value={dilutionValue}
            onChange={handleDilutionValueChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="abnormal count"
            value={abnormalCount}
            onChange={handleAbnormalCountChange}
            disabled={suspend}
          />
          <TextField
            id="standard-basic"
            label="item distinct abnormal"
            value={itemDistinctAbnormal}
            onChange={handleItemDistinctAbnormalChange}
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
