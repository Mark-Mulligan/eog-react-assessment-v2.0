import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../MetricCards/reducer';
import { actions as dashboardActions } from './reducer';
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

const getMetricsSelected = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected,
  };
};

const Dashboard = () => {
  const [subscriptionStarted, setSubscriptionStarted] = useState(false);
  const [currentFlareData, setCurrentFlareData] = useState({
    value: 0,
    unit: '',
    metric: '',
    at: 0,
    dateTime: '',
  });
  const [currentInjValve, setCurrentInjValve] = useState({
    value: 0,
    unit: '',
    metric: '',
    at: 0,
    dateTime: '',
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

    //console.log(data);

    let flareTempData: any = {};
    let injValveData: any = {};
    
    if (data.length === 1 || data.length % 6 === 1) {
      dispatch(actions.oilDataUpdate(data[0]));
      //setCurrentOilData(data[0]);

      if (subscriptionStarted === false) {
        setSubscriptionStarted(true);
        dispatch(dashboardActions.subscriptionStartTime(data[0].at));
      }
    }

    if (data.length === 4 || data.length % 6 === 4) {
      dispatch(actions.waterDataUpdate(data[0]));
    }

    /* for (let i = 0; i < data.length; i++) {
      if (data[i].metric === 'oilTemp') {
        oilTempData = data[i];
        i = data.length;
      }
    } */


    for (let i = 0; i < data.length; i++) {
      if (data[i].metric === 'flareTemp') {
        flareTempData = data[i]
        i = data.length;
      }
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].metric === 'injValveOpen') {
        injValveData = data[i];
        i = data.length;
      }
    }

    //const filteredOilT = data.filter((measurement: any) => measurement.metric === 'oilTemp');
    //const otData = filteredOilT.slice(0, 1).map((measurement: any) => measurement);
    //const filteredWaterT = data.filter((measurement: any) => measurement.metric === 'waterTemp');
    //const wtData = filteredWaterT.slice(0, 1).map((measurement: any) => measurement);
    //const filteredFlareT = data.filter((measurement: any) => measurement.metric === 'flareTemp');
    //const ftData = filteredFlareT.slice(0, 1).map((measurement: any) => measurement);
    //const filteredInjV = data.filter((newMeasurement: any) => newMeasurement.metric === 'injValveOpen');
    //const ivData = filteredInjV.slice(0, 1).map((measurement: any) => measurement);



    /* if (currentOilData.at !== otData[0].at) {
      dispatch(actions.oilDataUpdate(otData[0]));
      setCurrentOilData(otData[0]);
    } */

    /* if (currentOilData.at !== oilTempData.at) {
      dispatch(actions.oilDataUpdate(oilTempData));
      setCurrentOilData(oilTempData);
    } */

    /* if (wtData.length > 0 && currentWaterData.at !== wtData[0].at) {
      dispatch(actions.waterDataUpdate(wtData[0]));
      setCurrentWaterData(wtData[0]);
    } */

    if (JSON.stringify(flareTempData) !== '{}' && currentFlareData.at !== flareTempData.at) {
      dispatch(actions.flareDataUpdate(flareTempData));
      setCurrentFlareData(flareTempData);
    }

    /* if (ftData.length > 0 && currentFlareData.at !== ftData[0].at) {
      dispatch(actions.flareDataUpdate(ftData[0])); 
      setCurrentFlareData(ftData[0]);
    } */

    if (JSON.stringify(injValveData) !== '{}' && currentInjValve.at !== injValveData.at) {
      dispatch(actions.injValveDataUpdate(injValveData));
      setCurrentInjValve(injValveData);
    }

    /* if (ivData.length > 0 && currentInjValve.at !== ivData[0].at) {
      const newInjValveData = createMetricDataObj(ivData[0]);
      setCurrentInjValve(newInjValveData);

      const metricsCopy: any = metricsSelected;
      if (metricsCopy.includes('injValveOpen')) {
        dispatch(actions.injValveDataUpdate(newInjValveData));
      }
    } */
  }, [data, error]);

  return (
    <div>
      <h2>Oil Temp</h2>
      <p>No Need</p>
    </div>
  );
};

export default Dashboard;
