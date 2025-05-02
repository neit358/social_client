import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        search: '',
    },
    reducers: {
        setHeaderSearch: (state, action) => {
            state.search = action.payload;
        },
        clearHeaderSearch: (state) => {
            state.search = '';
        },
    },
});

export default headerSlice.reducer;
export const { setHeaderSearch, clearHeaderSearch } = headerSlice.actions;
