import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricSelect/reducer';
import { reducer as chartDataReducer } from '../Features/MetricCards/reducer';
import { reducer as dashboardReducer } from '../Features/Dashboard/reducer';


export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  subscriptionStart: dashboardReducer,
  chartData: chartDataReducer
};
