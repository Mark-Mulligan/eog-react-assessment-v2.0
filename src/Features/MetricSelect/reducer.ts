import { createSlice, PayloadAction } from 'redux-starter-kit';

export type metricsAvailable = {
  metricsAvailable: string[];
};

export type metricsSelected = {
  metricsSelected: string[];
};

export type ApiErrorAction = {
  error: string;
};

export type InitialState = {
  metricsAvaiable: string[];
  metricsSelected: string[];
};

const initialState = {
  metricsAvailable: [],
  metricsSelected: []
}; 

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsAvailable: (state, action: PayloadAction<metricsAvailable>) => {
      const metricsAvailable = action.payload;
      state.metricsAvailable = metricsAvailable as any;
    },
    metricsSelected: (state, action: PayloadAction<metricsSelected>) => {
      const metricsSelected = action.payload;
      state.metricsSelected = metricsSelected as any;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
