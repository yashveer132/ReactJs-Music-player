import {createSlice} from '@reduxjs/toolkit';
import { fetchLikedSongs } from '../utils/thunks';

export const favoritesSlice = createSlice({
    name:'favorites',
    initialState:{
        player:false,
        likedSongs:[]
    },
    reducers:{
        setPlayer:(state,action) => {
            state.player = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchLikedSongs.pending,(state)=>{
        })
        .addCase(fetchLikedSongs.fulfilled,(state,action)=>{
            state.likedSongs = action.payload
        })
        .addCase(fetchLikedSongs.rejected,(state)=>{
        })
    }
})

export const { setPlayer } = favoritesSlice.actions;
export default favoritesSlice.reducer;