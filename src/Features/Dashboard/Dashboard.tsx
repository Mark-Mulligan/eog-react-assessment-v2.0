import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../MetricCards/reducer';
import { actions as dashboardActions } from './reducer';
import { useSubscription } from 'urql';
import MetricSelect from "../MetricSelect/MetricSelect";
import MetricCardContainer from "../MetricCards/MetricCardContainer";

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

const Dashboard = () => {
  const [subscriptionStarted, setSubscriptionStarted] = useState(false);

  const dispatch = useDispatch();

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

    
    if (data.length === 1 || data.length % 6 === 1) {
      dispatch(actions.oilDataUpdate(data[0]));

      if (subscriptionStarted === false) {
        setSubscriptionStarted(true);
        dispatch(dashboardActions.subscriptionStartTime(data[0].at));
      }
    }

    if (data.length === 2 || data.length % 6 === 2) {
      dispatch(actions.tubingPressureDataUpdate(data[0]));
    }

    if (data.length === 3 || data.length % 6 === 3) {
      dispatch(actions.casingPressureDataUpdate(data[0]));
    }

    if (data.length === 4 || data.length % 6 === 4) {
      dispatch(actions.waterDataUpdate(data[0]));
    }

    if (data.length === 5 || data.length % 6 === 5) {
      dispatch(actions.injValveDataUpdate(data[0]));
    }

    // Need to check to make sure 0 % 6 does not equal 0;
    if (data.length === 6 || data.length % 6 === 0) {
      dispatch(actions.flareDataUpdate(data[0]));
    }

    

   

  }, [data, error]);

  return (
    <div>
      <MetricSelect />
      <MetricCardContainer />
    </div>
  );
};

export default Dashboard;
