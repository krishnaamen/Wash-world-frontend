import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserAPI } from '../api/userAPI';
import { LoginDTO } from '../entities/LoginDTO';
import { SignUpDTO } from '../entities/SignUpDTO';

interface UserState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface User {
    id: number;
    username: string;
    role: Role
}

export enum Role {
    User = 'user',
    PremiumUser = 'premium',
    Admin = 'admin',
}

const initialState: UserState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'user/login',
    async (credentials: { email: string; password: string }, thunkAPI) => {
        // try {
            const logindto = new LoginDTO(credentials.email,credentials.password)
            const response = await UserAPI.login(logindto);
            console.log(response);
            return response;
            

        // } catch (error) {
        //     return thunkAPI.rejectWithValue(error.message);
        // }
    }
);

export const signup = createAsyncThunk(
    'user/signup',
    async (userData: { firstName:string, lastName:string,email: string, password: string,dob:Date }, thunkAPI) => {
        try {
            const signUpDTO = new SignUpDTO(userData.firstName, userData.lastName, userData.dob,userData.email, userData.email, userData.password)
            console.log("signupDTO",signUpDTO);
            const response = UserAPI.signup(signUpDTO);
            console.log(response);
            return response;
            
            
         } catch (error: any) {
             return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload.user;
                state.token = action.payload.access_token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// export const selectUser = (state: RootState) => state.user.user;
// export const selectToken = (state: RootState) => state.user.token;
// export const selectLoading = (state: RootState) => state.user.loading;
// export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;