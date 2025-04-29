import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            id: '',
            name: '',
        },
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            state.auth.id = action.payload.id;
            state.auth.name = action.payload.name;
        },
        clearUser: (state) => {
            state.auth.id = '';
            state.auth.name = '';
        },
    },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
