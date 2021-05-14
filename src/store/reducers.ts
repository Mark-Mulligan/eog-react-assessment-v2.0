import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricSelect/reducer';
import { reducer as chartDataReducer } from '../Features/MetricCards/reducer';


export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  chartData: chartDataReducer
};
