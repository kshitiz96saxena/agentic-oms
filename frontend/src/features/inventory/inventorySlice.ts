import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    quantity: number;
}

interface InventoryState {
    items: InventoryItem[];
}

const initialState: InventoryState = {
    items: [
        { id: '1', name: 'iPhone 15 Pro', sku: 'IP15P-BLK', quantity: 12 },
        { id: '2', name: 'MacBook Air M2', sku: 'MBA-M2-SLV', quantity: 5 },
        { id: '3', name: 'AirPods Pro', sku: 'APP-2', quantity: 25 },
    ],
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        incrementStock: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        // Useful for the future "Add Item" modal
        addItem: (state, action: PayloadAction<InventoryItem>) => {
            state.items.push(action.payload);
        }
    },
});

export const { incrementStock, addItem } = inventorySlice.actions;
export default inventorySlice.reducer;
