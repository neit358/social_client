import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            id: '',
            name: '',
            image: '',
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.auth.id = action.payload.id;
            state.auth.name = action.payload.name;
            state.auth.image = action.payload.image;
        },
        clearUser: (state) => {
            state.auth.id = '';
            state.auth.name = '';
            state.auth.image = '';
        },
    },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
