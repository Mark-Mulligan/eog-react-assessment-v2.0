import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../MetricCards/reducer';
import { IState } from '../../store';
import { useSubscription, useQuery } from 'urql';

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

const handleSubscription = (messages = [], response: { newMeasurement: any }) => {
  return [response.newMeasurement, ...messages];
};

const getMetricsSelected = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected
  };
};



const Dashboard = () => {
  const [currentOilData, setCurrentOilData] = useState({
    value: 0,
    unit: '',
    metric: '',
    at: 0,
    dateTime: ''
  });


  const dispatch = useDispatch();
  const { metricsSelected } = useSelector(getMetricsSelected);

  const [result] = useSubscription({ query: newMeasurement }, handleSubscription as any);
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(actions.measurmentApiErrorReceived({ error: error.message }));
    }
    if (!data) {
      return;
    }

    const filteredOilT = data.filter((measurement: any) => measurement.metric === 'oilTemp');
    const otData = filteredOilT.slice(0, 1).map((measurement: any) => measurement);

    if (currentOilData.at !== otData[0].at) {
      //console.log(currentOilData, otData[0]);
      let date = new Date(otData[0].at);

      const newOilData: any = {
        at: otData[0].at,
        value: otData[0].value,
        unit: otData[0].unit,
        metric: otData[0].metric,
        dateTime: `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`
      }

      setCurrentOilData(newOilData);

      const testArr: any = metricsSelected

      if (testArr.includes("oilTemp")) {
        dispatch(actions.oilDataUpdate(newOilData));
      }
      //console.log(otData);
    }
  }, [data, error]);

  return (
    <div>
      <h2>Oil Temp</h2>
      <p>{currentOilData.value}</p>
    </div>
  );
};

export default Dashboard;
