import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSubscription } from 'urql';

const newMeasurement = `
subscription {
  newMeasurement {
    unit
    at
    value
    metric
  }
}
`;

const handleSubscription = (messages = [], response: { newMeasurement: any; }) => {
  return [response.newMeasurement, ...messages];
};

const Dashboard = () => {
  const [metricData, setMetricData] = useState(0);

  const [result] = useSubscription({ query: newMeasurement }, handleSubscription as any);

  const { data, error } = result;

  //const filteredOilT = res.data.filter((measurement: any) => measurement.metric === "oilTemp")
  //const otData = filteredOilT.slice(0,1).map((measurement: any) => measurement.value);

  useEffect(() => {
    if (error) {
      console.log(error);
      //dispatch({ type: actions.NEW_MEASUREMENTS_API_CALL_FAIL, error });
    }
    if (!data) {
      return;
    }

    console.log(data)
    //const filteredOilT = data.filter((measurement: any) => measurement.metric === "oilTemp");
    //const otData = filteredOilT.slice(0,1).map((measurement: any) => measurement.value);;

    /* if (metricData !== otData[0]) {
      console.log(metricData, otData[0])
      setMetricData(otData[0]);
      //console.log(otData);
    } */
    
    

  }, [data, error])
  


  return (
    <div>
      <h2>Oil Temp</h2>
      <p>{metricData}</p>
    </div>
  );
};

export default Dashboard;


