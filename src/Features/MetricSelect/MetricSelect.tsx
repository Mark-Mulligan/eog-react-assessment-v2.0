import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { IState } from '../../store';
import { FormControl, InputLabel, Select, Input, Chip, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { convertCamelCase } from '../../util';

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


// GraphQL query used to populate the multi select
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

  //Function for handeling changes in the multiselect
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const optionsSelected = event.target.value as string[];
    dispatch(actions.metricsSelected(optionsSelected as any))
  };

  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    // If an error occurs during the api call, send this to redux 
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    // If there is a response, send this data to the redux store
    const { getMetrics } = data;
    dispatch(actions.metricsAvailable(getMetrics));
  }, [data, error, dispatch, metricsSelected]);

  if (fetching) {
    return <LinearProgress />;
  }

  return (
    <div className="col-sm-6 col-12 mb-4 d-flex align-items-center">
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
                <Chip key={value} label={convertCamelCase(value)} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {metricsAvailable.map(metric => (
            <MenuItem key={metric} value={metric}>
              {convertCamelCase(metric)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MetricSelect;