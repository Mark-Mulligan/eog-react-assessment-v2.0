import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricSaga from '../Features/MetricSelect/saga';
import dashboardSaga from '../Features/Dashboard/saga';
import metricSelectSaga from '../Features/MetricSelect/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricSaga);
  yield spawn(dashboardSaga);
  yield spawn(metricSelectSaga);
}
