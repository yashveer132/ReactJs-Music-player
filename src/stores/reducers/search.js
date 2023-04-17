import {createSlice} from '@reduxjs/toolkit';
import { fetchSearchTracks } from '../utils/thunks';

export const searchSlice = createSlice({
    name:'search',
    initialState:{
        searchlist:{
            tracks:[]
        }
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchSearchTracks.pending,(state)=>{
        })
        .addCase(fetchSearchTracks.fulfilled,(state,action)=>{
            state.searchlist.tracks = action.payload.map((item) => ({
                track: item,
            }));
        })
        .addCase(fetchSearchTracks.rejected,(state)=>{
        })
    }
}) 

export default searchSlice.reducer;