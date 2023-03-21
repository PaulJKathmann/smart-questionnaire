import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

console.log('Initial Store State:', store.getState());
export default store;
