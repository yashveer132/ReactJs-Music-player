import { createAsyncThunk } from '@reduxjs/toolkit';
import appClient from '../../spotify';

export const fetchLikedSongs = createAsyncThunk(
    'favorites/fetchLikedSongs',
    async() => {
        try{
            const res = await appClient.get(`me/tracks`);
            return res.data.items;
        }catch(err){
            console.log(err);
        }
    }
)

export const fetchPlaylistItems = createAsyncThunk(
    'playlist/fetchPlaylistItems',
    async({id}) => {
        try{
            const res = await appClient.get(`playlists/${id}/tracks`);
            return res.data.items;
        }catch(err){
            console.log(err);
        }
    }
)

export const fetchFeaturedPlaylistItems = createAsyncThunk(
    'featuredPlaylist/fetchFeaturedPlaylistItems',
    async({id}) => {
        try{
            const res = await appClient.get(`playlists/${id}/tracks`);
            return res.data.items;
        }catch(err){
            console.log(err);
        }
    }
)

export const fetchSearchTracks = createAsyncThunk(
    'search/fetchSearchTracks',
    async({query}) => {
        try{
            const res = await appClient.get(`search?q=${query}&type=track`);
            return res.data.tracks.items;
        }catch(err){
            console.log(err);
        }
    }
)