import React, { useEffect } from 'react';
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
  cardTitle: {
    fontSize: '1.3rem'
  }
});

const getCurrentData = (state: IState) => {
  const { currentOilData, currentWaterTemp, currentFlareTemp, currentInjValve, currentTubingPresssure, currentCasingPressure } = state.chartData;
  return {
    currentOilData,
    currentWaterTemp,
    currentFlareTemp,
    currentInjValve,
    currentTubingPresssure,
    currentCasingPressure
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
};

const query = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
    at
    value
    unit
  }
}
`;

export default function MetricCard({ title }: CardProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentOilData, currentWaterTemp, currentFlareTemp, currentInjValve, currentTubingPresssure, currentCasingPressure } = useSelector(getCurrentData);
  const { subscriptionStart } = useSelector(getSubscriptionStart);
  const oneMinInterval = 30 * 60 * 1000;

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
  }, [data, error, title, dispatch]);

  if (fetching) return <LinearProgress />;

  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <Card>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.cardTitle}>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {title === 'oilTemp' && `${currentOilData.value} F`}
          {title === 'waterTemp' && `${currentWaterTemp.value} F`}
          {title === 'flareTemp' &&`${currentFlareTemp.value} F` }
          {title === 'injValveOpen' && `${currentInjValve.value} %`}
          {title === 'tubingPressure' && `${currentTubingPresssure.value} PSI`}
          {title === 'casingPressure' && `${currentCasingPressure.value} PSI`}
        </Typography>
      </CardContent>
    </Card>
    </div>
    
  );
}
