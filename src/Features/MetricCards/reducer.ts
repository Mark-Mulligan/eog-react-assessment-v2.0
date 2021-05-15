import { createSlice, PayloadAction } from 'redux-starter-kit';

export type OilData = {
  oilTemp: any;
};

export type NewMetricData = {
  dateTime: '';
  at: 0;
  metric: '';
  unit: '';
  value: 0;
};

export type WaterData = {
  waterTemp: any;
};

export type FlareData = {
  flareTemp: any;
};

export type InjValveData = {
  injValveOpen: any;
};

export type TubbingData = {
  tubingPressure: any;
};

export type CasingData = {
  casingPressure: any;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  oilHistoryRequested: false,
  oilTemp: [
    {
      dateTime: '',
      at: 0,
      metric: '',
      unit: '',
      value: 0,
    },
  ],
  currentOilData: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0,
  },
  waterHistoryRequested: false,
  waterTemp: [
    {
      dateTime: '',
      at: 0,
      metric: '',
      unit: '',
      value: 0,
    },
  ],
  currentWaterTemp: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0,
  },
  flareHistoryRequested: false,
  flareTemp: [
    {
      dateTime: '',
      at: 0,
      metric: '',
      unit: '',
      value: 0,
    },
  ],
  currentFlareTemp: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0,
  },
  injValveHistoryRequested: false,
  injValveOpen: [
    {
      at: 0,
      value: 0,
    },
  ],
  currentInjValve: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0,
  },
  tubingPressureHistoryRequested: false,
  tubingPressure: [{
    at: 0,
    value: 0
  }],
  currentTubingPresssure: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0,
  },
  casingPressureHistoryRequested: false,
  casingPressure: [{
    at: 0,
    value: 0
  }],
  currentCasingPressure: {
    dateTime: '',
    at: 0,
    metric: '',
    unit: '',
    value: 0
  }
};

const slice = createSlice({
  name: 'oilTemp',
  initialState,
  reducers: {
    oilChartDataReceived: (state, action: PayloadAction<OilData>) => {
      if (state.oilHistoryRequested === false) {
        const pastOilTemp: any = action.payload;
        const currentOilTemp: any = state.oilTemp;
        state.oilTemp = [...pastOilTemp, ...currentOilTemp];
        state.oilHistoryRequested = true;
      }
    },
    oilDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const oilTemp = action.payload;
      if (state.oilTemp[0].at === 0) {
        state.oilTemp[0] = oilTemp;
        state.currentOilData = oilTemp;
        return;
      }

      state.oilTemp.push(oilTemp);
      state.currentOilData = oilTemp;
    },
    waterChartDataReceived: (state, action: PayloadAction<WaterData>) => {
      if (state.waterHistoryRequested === false) {
        const pastWaterTemp: any = action.payload;
        const currentWaterTemp: any = state.waterTemp;
        state.waterTemp = [...pastWaterTemp, ...currentWaterTemp];
        state.waterHistoryRequested = true;
      }
    },
    waterDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const waterTemp = action.payload;
      if (state.waterTemp[0].at === 0) {
        state.waterTemp[0] = waterTemp;
        state.currentWaterTemp = waterTemp;
        return;
      }

      state.waterTemp.push(waterTemp);
      state.currentWaterTemp = waterTemp;
    },
    flareChartDataReceived: (state, action: PayloadAction<FlareData>) => {
      if (state.flareHistoryRequested === false) {
        const pastFlareTemp: any = action.payload;
        const currentFlareTemp: any = state.flareTemp;
        state.flareTemp = [...pastFlareTemp, ...currentFlareTemp];
        state.flareHistoryRequested = true;
      }
    },
    flareDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const flareTemp = action.payload;
      if (state.flareTemp[0].at === 0) {
        state.flareTemp[0] = flareTemp;
        state.currentFlareTemp = flareTemp;
        return;
      }

      state.flareTemp.push(flareTemp);
      state.currentFlareTemp = flareTemp;
    },
    injValveChartDataReceived: (state, action: PayloadAction<InjValveData>) => {
      if (state.injValveHistoryRequested === false) {
        const pastInjValve: any = action.payload;
        const currentInjValve: any = state.injValveOpen;
        state.injValveOpen = [...pastInjValve, ...currentInjValve];
        state.injValveHistoryRequested = true;
      }
    },
    injValveDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const injValve = action.payload;
      if (state.injValveOpen[0].at === 0) {
        state.injValveOpen[0] = injValve;
        state.currentInjValve = injValve;
        return;
      }

      state.injValveOpen.push(injValve);
      state.currentInjValve = injValve;
    },
    tubingPressureChartDataReceived: (state, action: PayloadAction<TubbingData>) => {
      if (state.tubingPressureHistoryRequested === false) {
        const pastTubingPressure: any = action.payload;
        const currentTubingPresssure: any = state.tubingPressure;
        state.tubingPressure = [...pastTubingPressure, ...currentTubingPresssure];
        state.tubingPressureHistoryRequested = true;
      }
    },
    tubingPressureDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const tubingPressure = action.payload;
      if (state.tubingPressure[0].at === 0) {
        state.tubingPressure[0] = tubingPressure;
        state.currentTubingPresssure = tubingPressure;
      }

      state.tubingPressure.push(tubingPressure);
      state.currentTubingPresssure = tubingPressure;
    },

    casingPressureChartDataReceived: (state, action: PayloadAction<CasingData>) => {
      if (state.casingPressureHistoryRequested === false) {
        const pastCasingPressure: any = action.payload;
        const currentCasingPressure: any = state.casingPressure;
        state.casingPressure = [...pastCasingPressure, ...currentCasingPressure];
        state.casingPressureHistoryRequested = true;
      }
    },
    casingPressureDataUpdate: (state, action: PayloadAction<NewMetricData>) => {
      const casingPressure = action.payload;
      if (state.casingPressure[0].at === 0) {
        state.casingPressure[0] = casingPressure;
        state.currentCasingPressure = casingPressure;
      }

      state.casingPressure.push(casingPressure);
      state.currentCasingPressure = casingPressure;
    },
    measurmentApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
