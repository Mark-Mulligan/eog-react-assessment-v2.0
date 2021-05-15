import { createSlice, PayloadAction } from 'redux-starter-kit';

export type OilData = {
  oilTemp: any;
};

export type NewMetricData = {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0
}

export type WaterData = {
  waterTemp: any;
}

export type FlareData = {
  flareTemp: any;
}

export type InjValveData = {
  injValveOpen: any;
}

export type TubbingData = {
  tubingPressure: any;
}

export type CasingData = {
  casingPressure: any;
}

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  oilTemp: [{
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0
  }],
  currentOilData: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0
  },
  waterTemp: [{
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0
  }],
  currentWaterTemp: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0
  },
  flareTemp: [],
  injValveOpen: [],
  tubingPressure: [],
  casingPressure: []
};

const slice = createSlice({
  name: 'oilTemp',
  initialState,
  reducers: {
    oilChartDataReceived: (state, action: PayloadAction<OilData>) => {
      console.log('redux state', state.oilTemp);
      const oilTemp = action.payload;
      state.oilTemp = oilTemp as any;
    },
    oilDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const oilTemp = action.payload;
      state.oilTemp.push(oilTemp);
      state.currentOilData = oilTemp;
    },
    waterChartDataReceived: (state, action: PayloadAction<WaterData>) => {
      const waterTemp = action.payload;
      state.waterTemp = waterTemp as any;
    },
    waterDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const waterTemp = action.payload;
      state.waterTemp.push(waterTemp);
      state.currentWaterTemp = waterTemp;
    },
    flareChartDataReceived: (state, action: PayloadAction<FlareData>) => {
      const flareTemp = action.payload;
      state.flareTemp = flareTemp as any;
    },
    injValveChartDataReceived: (state, action: PayloadAction<InjValveData>) => {
      const injValveOpen = action.payload;
      state.injValveOpen = injValveOpen as any;
    },
    tubingPressureChartDataReceived: (state, action: PayloadAction<TubbingData>) => {
      const tubingPressure = action.payload;
      state.tubingPressure = tubingPressure as any;
    },
    casingPressureChartDataReceived: (state, action: PayloadAction<CasingData>) => {
      const casingPressure = action.payload;
      state.casingPressure = casingPressure as any;
    },
    measurmentApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;