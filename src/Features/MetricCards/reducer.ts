import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ChartData = {
  oilTemp: any;
};

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

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  oilTemp: [],
  waterTemp: [],
  flareTemp: [],
  injValveOpen: [],
  tubingPressure: []
};

const slice = createSlice({
  name: 'oilTemp',
  initialState,
  reducers: {
    oilChartDataReceived: (state, action: PayloadAction<ChartData>) => {
      const oilTemp = action.payload;
      state.oilTemp = oilTemp as any;
    },
    waterChartDataReceived: (state, action: PayloadAction<WaterData>) => {
      const waterTemp = action.payload;
      state.waterTemp = waterTemp as any;
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
    measurmentApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;