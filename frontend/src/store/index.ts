import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventory/inventorySlice';
import orderReducer from '../features/orders/orderSlice';

export const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
        orders: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
