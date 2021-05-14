import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useQuery } from 'urql';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'inline-block'
  },
  pos: {
    marginBottom: 12,
  },
});

type CardProps = {
  title: string,
  timeStamp: number,
  metricReading: string
}

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

export default function MetricCard({ title, timeStamp, metricReading }: CardProps) {
  const classes = useStyles();

  const dispatch = useDispatch();

  //const thirtyMinInterval = 30 * 60 * 1000;
  const oneMinInterval = 1 * 60 * 1000;
  //console.log('timestamp', timeStamp);
  
  const input = {
    metricName: String(title),
    before: timeStamp,
    after: timeStamp-oneMinInterval,
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

    console.log(data.getMeasurements);

    if (data.getMeasurements[0].metric === "oilTemp") {
      dispatch(actions.oilChartDataReceived(data.getMeasurements));
      //console.log('oil temp data');
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
          {metricReading}
        </Typography>
      </CardContent>
    </Card>
  );
}