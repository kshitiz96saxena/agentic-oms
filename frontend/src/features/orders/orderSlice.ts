import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Order {
    id: string;
    provider: 'Blinkit' | 'Zepto' | 'Shopify';
    customer: string;
    items: string;
    status: 'Incoming' | 'Dispatched' | 'Delivered';
    time: string;
}

interface OrderState {
    orders: Order[];
}

// THIS is where the data is currently "coming from"
const initialState: OrderState = {
    orders: [
        { id: 'ORD-101', provider: 'Blinkit', customer: 'Rahul Sharma', items: '2x iPhone 15', status: 'Incoming', time: '2 mins ago' },
        { id: 'ORD-102', provider: 'Zepto', customer: 'Anita Singh', items: '1x MacBook Air', status: 'Dispatched', time: '1 hour ago' },
        { id: 'ORD-103', provider: 'Shopify', customer: 'John Doe', items: '3x AirPods Pro', status: 'Incoming', time: 'Just now' },
    ],
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload); // Adds new orders to the top
        }
    },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
