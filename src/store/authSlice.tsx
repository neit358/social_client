import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: '',
        name: '',
        email: '',
        avatar: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
        },
        clearUser: (state) => {
            state.id = '';
            state.email = '';
            state.name = '';
            state.avatar = '';
        },
    },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
