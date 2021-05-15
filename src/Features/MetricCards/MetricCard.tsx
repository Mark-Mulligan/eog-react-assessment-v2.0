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
  const { currentOilData } = state.chartData;
  return {
    currentOilData
  };
};

type CardProps = {
  title: string;
  timeStamp: number;
};

const query = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

export default function MetricCard({ title, timeStamp }: CardProps) {
  const classes = useStyles();
  const dispatch = useDispatch();



  //const thirtyMinInterval = 30 * 60 * 1000;
  const oneMinInterval = 1 * 60 * 1000;
  //console.log('timestamp', timeStamp);
  const updatedData = useSelector(getCurrentData);

  const input = {
    metricName: String(title),
    before: timeStamp,
    after: timeStamp - oneMinInterval,
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

    if (!data) return;

    const dataWithReadableTime: any = [];

    data.getMeasurements.forEach((rawData: any ) => {
      console.log(rawData);
      let date = new Date(rawData.at);

      dataWithReadableTime.push({
        dateTime: `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`,
        at: rawData.at,
        metric: rawData.metric,
        unit: rawData.unit,
        value: rawData.value,
      });
    }); 

    if (data.getMeasurements[0].metric === 'oilTemp') {
      dispatch(actions.oilChartDataReceived(dataWithReadableTime));
    }

    if (data.getMeasurements[0].metric === 'waterTemp') {
      dispatch(actions.waterChartDataReceived(dataWithReadableTime));
    }

    if (data.getMeasurements[0].metric === 'flareTemp') {
      dispatch(actions.flareChartDataReceived(dataWithReadableTime));
    }

    if (data.getMeasurements[0].metric === 'injValveOpen') {
      dispatch(actions.injValveChartDataReceived(dataWithReadableTime));
    }

    if (data.getMeasurements[0].metric === 'tubingPressure') {
      dispatch(actions.tubingPressureChartDataReceived(dataWithReadableTime));
    }

    if (data.getMeasurements[0].metric === 'casingPressure') {
      dispatch(actions.casingPressureChartDataReceived(dataWithReadableTime));
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
          {title === "oilTemp" && `${updatedData.currentOilData.value} ${updatedData.currentOilData.unit}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
