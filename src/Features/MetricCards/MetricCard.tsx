import React, { useEffect } from 'react';
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

/* const query = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
  	metric
    value
    unit
    at
  }
}
`; */

type CardProps = {
  title: string,
  timeStamp: number,
  metricReading: string
}

/* const query = `
query($input: MeasurementQuery) {
  getMeasurements(input: {
    metricName: "oilTemp"
    after: $after
  }) {
    at
    metric
    value
    unit
  }
}
`; */

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


/* let currentTime = Date.now();
  let past30Min = currentTime - 1800000;
  console.log(past30Min);

  const [historicalData] = useQuery({
    query,
    variables: {
      metricType: "oilTemp",
      after: past30Min
    },
  }); */

export default function MetricCard({ title, timeStamp, metricReading }: CardProps) {
  const classes = useStyles();

  //const thirtyMinInterval = 30 * 60 * 1000;
  const fiveMinInterval = 5 * 60 * 1000;
  console.log('timestamp', timeStamp);
  
  const input = {
    metricName: String(title),
    before: timeStamp,
    after: timeStamp-fiveMinInterval,
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
      return;
    }

    if (!data) return;

    console.log('oil data', data);
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