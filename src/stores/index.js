import { configureStore } from '@reduxjs/toolkit';
import FavoritesReducer from './reducers/favorites';
import PlayReducer from './reducers/play';
import PlaylistReducer from './reducers/playlist';
import FeaturedPlaylistReducer from './reducers/featuredPlaylist';
import SearchReducer from './reducers/search';

export const store = configureStore({
    reducer:{
        favorites: FavoritesReducer,
        play: PlayReducer,
        playlist: PlaylistReducer,
        featuredPlaylist: FeaturedPlaylistReducer,
        search: SearchReducer
    }
})