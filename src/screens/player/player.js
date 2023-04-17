import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import appClient from '../../spotify';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylistItems } from '../../stores/utils/thunks';
import PlaylistWidget from '../../components/playlistWidgets/playlistWidget';
import '../favorites/favorites.css';

export default function Player() {
  const location = useLocation();
  const [name, setName] = useState(null);
  const playlist = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(location.state){
      dispatch(fetchPlaylistItems({id:`${location.state?.id}`}));
      appClient.get("me").then(response => {setName(response.data.display_name);});
    }
  },[location.state])

  return (
    <div className='screen-container flex'>
      <div className='color'></div>
      <div className='color'></div>
      <div className='color'></div>
      <div className='fav-container flex'>
        <div className='upper-body'>
          <div className='container flex'>
            <div className='outer-box flex'>
              <div className='boxHeart flex'>
                <img src={location.state?.url} alt='playlist-art' className='playlist-pic'/>              
              </div>
            </div>            
            <div className='info'>
              <p className='same'>Playlist</p>
              <p className='like'>{location.state?.name}</p>
              <p className='same'>{name}<span> . </span>{playlist.playlistItems.length} songs</p>
            </div>
          </div>
        </div>
        <div className='lower-body flex'>
          <div className='lower-body-container'>
            {playlist.playlistItems?.map((item, index) => (
              <PlaylistWidget item={item} index={index}/>
            ))}
          </div>          
        </div>
      </div>
    </div>
  )
}
