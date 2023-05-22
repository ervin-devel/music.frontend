import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { CoreApi } from "./services/ApiCore";

export const store = configureStore({
  reducer: {
    [CoreApi.reducerPath]: CoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CoreApi.middleware),
});
