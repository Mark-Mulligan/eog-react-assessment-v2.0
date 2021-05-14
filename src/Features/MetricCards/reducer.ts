import { createSlice, PayloadAction } from 'redux-starter-kit';

export type OilChartData = {
  oilChartData: any;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  oilChartData: [],
};

const slice = createSlice({
  name: 'oilChartData',
  initialState,
  reducers: {
    oilChartDataReceived: (state, action: PayloadAction<OilChartData>) => {
      const oilChartData = action.payload;
      state.oilChartData = oilChartData as any;
    },
    measurmentApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;