import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { IState } from '../../store';
import { FormControl, InputLabel, Select, Input, Chip, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//https://stackoverflow.com/questions/64670624/deletable-chips-in-material-ui-multiple-select

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));



const query = `
{
  getMetrics
}
`;

const getMetricsAvailable = (state: IState) => {
  const { metricsAvailable, metricsSelected } = state.metrics;
  return {
    metricsAvailable,
    metricsSelected
  };
};

const MetricSelect = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { metricsAvailable, metricsSelected } = useSelector(getMetricsAvailable);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const optionsSelected = event.target.value as string[];
    dispatch(actions.metricsSelected(optionsSelected as any))
  };

  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    const { getMetrics } = data;
    dispatch(actions.metricsAvailable(getMetrics));
  }, [data, error, dispatch, metricsSelected]);

  if (fetching) {
    return <LinearProgress />;
  }

  return (
    <div className="container-fluid mt-5">
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="metric-select-label">Metric Readings</InputLabel>
        <Select
          required
          labelId="metric-select-label"
          id="metric-select"
          multiple
          value={metricsSelected}
          onChange={handleChange}
          input={<Input id="metric-color-chip" />}
          renderValue={metricsSelected => (
            <div className={classes.chips}>
              {(metricsSelected as string[]).map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {metricsAvailable.map(metric => (
            <MenuItem key={metric} value={metric}>
              {metric}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MetricSelect;