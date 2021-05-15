import { createSlice, PayloadAction } from 'redux-starter-kit';

export type subscriptionStart = {
  subscriptionStart: number;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  subscriptionStart: 0
};

const slice = createSlice({
  name: 'startTime',
  initialState,
  reducers: {
    subscriptionStartTime: (state, action: PayloadAction<subscriptionStart>) => {
      const subscriptionStart = action.payload;
      state.subscriptionStart= subscriptionStart as any;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;