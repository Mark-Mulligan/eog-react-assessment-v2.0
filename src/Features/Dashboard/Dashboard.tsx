import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../MetricCards/reducer';
import { IState } from '../../store';
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

const handleSubscription = (messages = [], response: { newMeasurement: any }) => {
  return [response.newMeasurement, ...messages];
};

const createMetricDataObj = (inputData: any) => {
  let date = new Date(inputData.at);

  const newMetricDataObj: any = {
    at: inputData.at,
    value: inputData.value,
    unit: inputData.unit,
    metric: inputData.metric,
    dateTime: `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`,
  };

  return newMetricDataObj;
};

const getMetricsSelected = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected,
  };
};

const Dashboard = () => {
  const [currentOilData, setCurrentOilData] = useState({
    value: 0,
    unit: '',
    metric: '',
    at: 0,
    dateTime: '',
  });
  const [currentWaterData, setCurrentWaterData] = useState({
    value: 0,
    unit: '',
    metric: '',
    at: 0,
    dateTime: '',
  });
  const [currentFlareData, setCurrentFlareData] = useState({
    value: 0,
    unit: '',
    metric: '',
    at: 0,
    dateTime: '',
  })

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
    const filteredWaterT = data.filter((measurement: any) => measurement.metric === 'waterTemp');
    const wtData = filteredWaterT.slice(0, 1).map((measurement: any) => measurement);
    const filteredFlareT = data.filter((measurement: any) => measurement.metric === 'flareTemp');
    const ftData = filteredFlareT.slice(0, 1).map((measurement: any) => measurement);

    if (currentOilData.at !== otData[0].at) {
      const newOilData = createMetricDataObj(otData[0]);
      setCurrentOilData(newOilData); 

      const metricArr: any = metricsSelected;

      if (metricArr.includes('oilTemp')) {
        dispatch(actions.oilDataUpdate(newOilData));
      }
    }

    if (wtData.length > 0 && currentWaterData.at !== wtData[0].at) {
      const newWaterData = createMetricDataObj(wtData[0]);
      setCurrentWaterData(newWaterData);

      const metricsCopy: any = metricsSelected;

      if (metricsCopy.includes('waterTemp')) {
        dispatch(actions.waterDataUpdate(newWaterData));
      }
    }

    if (ftData.length > 0 && currentFlareData.at !== ftData[0].at) {
      const newFlareData = createMetricDataObj(ftData[0]);
      setCurrentFlareData(newFlareData);

      const metricsCopy: any = metricsSelected;

      if (metricsCopy.includes('flareTemp')) {
        dispatch(actions.flareDataUpdate(newFlareData));
      }
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
