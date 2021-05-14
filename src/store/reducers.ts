import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricSelect/reducer';


export default {
  weather: weatherReducer,
  metrics: metricsReducer
};
