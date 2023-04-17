import {createSlice} from '@reduxjs/toolkit';
import { fetchPlaylistItems } from '../utils/thunks';

export const playlistSlice = createSlice({
    name:'playlist',
    initialState:{
        playlistItems:[]
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchPlaylistItems.pending,(state)=>{
        })
        .addCase(fetchPlaylistItems.fulfilled,(state,action)=>{
            state.playlistItems = action.payload
        })
        .addCase(fetchPlaylistItems.rejected,(state)=>{
        })
    }
})

export default playlistSlice.reducer;