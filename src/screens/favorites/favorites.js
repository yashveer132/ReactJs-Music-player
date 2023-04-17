import React, { useEffect, useState } from 'react';
import './favorites.css';
import appClient from '../../spotify';
import { MdFavorite } from "react-icons/md";
import { IconContext } from 'react-icons';
import FavWidget from '../../components/favWidgets/favWidget';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLikedSongs } from '../../stores/utils/thunks';

export default function Favorites() {

  const [name, setName] = useState(null);
  const favorites = useSelector((state) => state.favorites)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchLikedSongs())
    appClient.get("me").then(response => {setName(response.data.display_name);});
  },[]);

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
                <IconContext.Provider value={{size:'80px',color:"white"}}>
                  {<MdFavorite/>}
                </IconContext.Provider>                
              </div>
            </div>            
            <div className='info'>
              <p className='same'>Playlist</p>
              <p className='like'>Liked Songs</p>
              <p className='same'>{name}<span> . </span>{favorites.likedSongs.length} songs</p>
            </div>
          </div>
        </div>
        <div className='lower-body flex'>
          <div className='lower-body-container'>
            {favorites.likedSongs?.map((item, index) => (
              <FavWidget item={item} index={index}/>
            ))}
          </div>          
        </div>
      </div>
    </div>
  )
}
