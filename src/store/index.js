import { configureStore } from "@reduxjs/toolkit";
import githubSlice from './github/githubSlice'

export const store = configureStore({
    reducer: {
        github: githubSlice
    }
})