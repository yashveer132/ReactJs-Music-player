import {createSlice} from '@reduxjs/toolkit';

export const playSlice = createSlice({
    name: 'play',
    initialState: {
        currentTrack:{},
        currentIndex:0, 
        tracks:[]
    },
    reducers: {
        setTracks: (state,action) => {
            state.tracks = action.payload
        },
        setCurrentTrack: (state,action) => {
            state.currentTrack = action.payload
        },
        setCurrentIndex: (state,action) => {
            state.currentIndex = action.payload
        }
    }
})

export const { setTracks, setCurrentTrack, setCurrentIndex } = playSlice.actions;
export default playSlice.reducer;