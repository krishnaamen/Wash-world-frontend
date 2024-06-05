import { configureStore } from '@reduxjs/toolkit'
import userReducer  from './userSlice'
import authReducer from './authSlice';


export const store = configureStore({
  reducer: {
    
    users: userReducer,
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// redux toolkit and react query is used for managing state in the application
// while hooks are used in the components to access the state