import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    profile: null,
    repos: null
}
export const parseGithubProfile = createAsyncThunk('githubSlice/parseGithubProfile', async (name) => {
    let {data} = await axios.get(`https://api.github.com/users/${name}`)
    console.log(data)
    return data
})

export const parseUserRepos = createAsyncThunk('githubSlice/parseUserRepos', async(name) => {
    let {data} = await axios.get(`https://api.github.com/users/${name}/repos`)
    console.log(data)
    return data
})

const githubSlice = createSlice({
    name: 'githubSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(parseGithubProfile.fulfilled, (state, action) => {
            state.profile = action.payload
        })

        builder.addCase(parseUserRepos.fulfilled, (state, action) => {
            state.repos = action.payload
        })
    }

})

export default githubSlice.reducer