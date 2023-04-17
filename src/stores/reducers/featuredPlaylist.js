import {createSlice} from '@reduxjs/toolkit';
import { fetchFeaturedPlaylistItems } from '../utils/thunks';

export const featuredPlaylistSlice = createSlice({
    name:'featuredPlaylist',
    initialState:{
        featuredPlaylistItems:[]
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchFeaturedPlaylistItems.pending,(state)=>{
        })
        .addCase(fetchFeaturedPlaylistItems.fulfilled,(state,action)=>{
            state.featuredPlaylistItems = action.payload
        })
        .addCase(fetchFeaturedPlaylistItems.rejected,(state)=>{
        })
    }
})

export default featuredPlaylistSlice.reducer;