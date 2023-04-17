import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import appClient from '../../spotify';
import './library.css';
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Library() {
  const [playlists, setPlaylists] = useState(null);
  useEffect(()=>{
    appClient.get('me/playlists').then(function(response){
      setPlaylists(response.data.items);
    })
  },[]);
  const navigate = useNavigate();
  const playPlaylist = (id,name,url) => {
    navigate('/player', {state:{id:id,name:name,url:url}});
  };
  
  return (
    <div className='screen-container'>
      <div className='color'></div>
      <div className='color'></div>
      <div className='color'></div>
      <div className='library-body'>
        {playlists?.map((playlist) => (
          <div className='playlist-card' key={playlist.id} onClick={()=>playPlaylist(playlist.id,playlist.name,playlist.images[0].url)}>
            <img src={playlist.images[0].url} className='playlist-img' alt='Playlist-Art'></img>
            <p className='playlist-name' >{playlist.name}</p> 
            <p className='playlist-track' >{playlist.tracks.total} Songs</p>
            <div className='playlist-play'>
              <IconContext.Provider value={{size:"50px", color:"#ff359b", style:{opacity:.7, padding:'5px'} }}>
                <AiFillPlayCircle/>
              </IconContext.Provider>  
            </div>          
          </div>
        ))}
      </div>
    </div>
  )
}
