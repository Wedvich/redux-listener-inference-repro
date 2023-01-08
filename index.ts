import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();

const slice = createSlice({
  name: "repro",
  initialState: [] as any[],
  reducers: {
    addString(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    addNumber(state, action: PayloadAction<number>) {
      state.push(action.payload);
    },
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    slice.actions.addString.match,
    slice.actions.addNumber.match
  ),
  effect: (action) => {
    // action is AnyAction, but this is the expected type:
    // {
    //     payload: string;
    //     type: "repro/addString";
    // } | {
    //     payload: number;
    //     type: "repro/addNumber";
    // }
  },
});
