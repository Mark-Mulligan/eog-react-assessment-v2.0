import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import { useQuery } from 'urql';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'inline-block',
  },
  pos: {
    marginBottom: 12,
  },
});

const getCurrentData = (state: IState) => {
  const { currentOilData, currentWaterTemp, currentFlareTemp, currentInjValve, currentTubingPresssure } = state.chartData;
  return {
    currentOilData,
    currentWaterTemp,
    currentFlareTemp,
    currentInjValve,
    currentTubingPresssure
  };
};

const getSubscriptionStart = (state: IState) => {
  const { subscriptionStart } = state.subscriptionStart;
  return {
    subscriptionStart
  }
}

type CardProps = {
  title: string;
  timeStamp: number;
};

const query = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
    at
    value
  }
}
`;

export default function MetricCard({ title, timeStamp }: CardProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentOilData, currentWaterTemp, currentFlareTemp, currentInjValve, currentTubingPresssure} = useSelector(getCurrentData);
  const { subscriptionStart } = useSelector(getSubscriptionStart);
  const oneMinInterval = 1 * 60 * 1000;

  const input = {
    metricName: String(title),
    before: subscriptionStart,
    after: subscriptionStart - oneMinInterval,
  };

  const [result] = useQuery({
    query: query,
    variables: {
      input,
    },
  });

  const { fetching, data, error } = result;

  useEffect(() => {

    if (error) {
      dispatch(actions.measurmentApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) {
      console.log('no data');
      return;
    }


    // Switch statment did not work, caused data to be overidden as more charts were added.  
    if (title === 'oilTemp') {
      dispatch(actions.oilChartDataReceived(data.getMeasurements));
    }

    if (title === 'waterTemp') {
      dispatch(actions.waterChartDataReceived(data.getMeasurements));
    }

    if (title === 'flareTemp') {
      dispatch(actions.flareChartDataReceived(data.getMeasurements));
    }

    if (title === 'injValveOpen') {
      dispatch(actions.injValveChartDataReceived(data.getMeasurements));
    }

    if (title === 'tubingPressure') {
      dispatch(actions.tubingPressureChartDataReceived(data.getMeasurements));
    }

    if (title === 'casingPressure') {
      dispatch(actions.casingPressureChartDataReceived(data.getMeasurements));
    } 
  }, [data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {title === 'oilTemp' && `${currentOilData.value} F`}
          {title === 'waterTemp' && `${currentWaterTemp.value} F`}
          {title === 'flareTemp' &&`${currentFlareTemp.value} F` }
          {title === 'injValveOpen' && `${currentInjValve.value} %`}
          {title === 'tubingPressure' && `${currentTubingPresssure.value} PSI`}
        </Typography>
      </CardContent>
    </Card>
  );
}
