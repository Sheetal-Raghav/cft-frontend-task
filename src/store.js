import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './features/filesSlice';


export const store = configureStore({
reducer: { files: filesReducer }
});