import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: '',
        name: '',
        avatar: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
        },
        clearUser: (state) => {
            state.id = '';
            state.name = '';
            state.avatar = '';
        },
    },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
