import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        userId: '',
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        clearUserId: (state) => {
            state.userId = '';
        },
    },
});

export default sidebarSlice.reducer;
export const { setUserId, clearUserId } = sidebarSlice.actions;
