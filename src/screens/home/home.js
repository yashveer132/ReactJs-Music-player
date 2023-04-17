import React, { useState, useEffect } from 'react';
import './home.css';
import appClient from '../../spotify';
import HomeWidget from "../../components/homeWidgets/homeWidget"

export default function Home() {
  const [recentPlay, setRecentPlay] = useState(null);
  const [featuredPlaylist, setFeaturedPlaylist] = useState(null);

  useEffect(()=>{
    appClient.get(`me/player/recently-played`)
    .then(res => {
      setRecentPlay(res.data.items);
    })
    .catch(err => console.log(err));
    
    appClient.get(`browse/featured-playlists`)
    .then(res => {
      setFeaturedPlaylist(res.data.playlists.items);
    })
    .catch(err => console.log(err));
  },[]);

  return (
    <div className='screen-container'>
      <div className='color'></div>
      <div className='color'></div>
      <div className='color'></div>
      <div className='home-body flex'>
        <HomeWidget title="Listen Again" recentPlay={recentPlay}/>
        <HomeWidget title="Featured Playlists" featuredPlaylist={featuredPlaylist}/>
      </div>
    </div>
  )
}
