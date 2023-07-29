import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setCookie} from 'nookies';

export const signupUser = createAsyncThunk(
    'users/create',
    async ({first_name, last_name, email, password}, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost/api/users/create/',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: first_name,
                        last_name: last_name,
                        email: email,
                        password: password,
                    }),
                }
            );
            let data = await response.json();
            console.log('data', data);
            if (response.status === 201) {
                setCookie(null, 'token', data.token, {path: '/', maxAge: 3600})
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/token',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost/api/users/token/',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            let data = await response.json();
            console.log('response', data);
            if (response.status === 200) {
                setCookie(null, 'token', data.token, {path: '/', maxAge: 3600})
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const fetchUserBytoken = createAsyncThunk(
    'users/me',
    async ({token}, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost/api/users/me/',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: "Token " + token,
                        'Content-Type': 'application/json',
                    },
                }
            );
            let data = await response.json();
            console.log('data fetching token', data, response.status);

            if (response.status === 200) {
                return {...data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        name: '',
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        },
    },
    extraReducers: {
        [signupUser.fulfilled]: (state, {payload}) => {
            console.log('payload fullfilled', payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.username = payload.email;
            state.name = payload.name;
        },
        [signupUser.pending]: (state) => {
            state.isFetching = true;
        },
        [signupUser.rejected]: (state, {payload}) => {
            console.log("rejected", payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.email;
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            console.log("running fullfiled login...");
            state.username = payload.email;
            state.name = payload.name;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [loginUser.rejected]: (state, {payload}) => {
            console.log('payload login rejected', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.non_field_errors;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUserBytoken.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUserBytoken.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.username = payload.email;
            state.name = payload.name;
        },
        [fetchUserBytoken.rejected]: (state, {payload}) => {
            console.log('fetchUserBytoken');
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.detail;
        },
    },
});

export const {clearState} = userSlice.actions;

export const userSelector = (state) => state.user;
