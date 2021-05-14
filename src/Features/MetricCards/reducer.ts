import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ChartData = {
  oilTemp: any;
};

export type WaterData = {
  waterTemp: any;
}

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  oilTemp: [],
  waterTemp: []
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
    measurmentApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;