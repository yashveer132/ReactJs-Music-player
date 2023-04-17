import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturedPlaylistItems } from '../../stores/utils/thunks';
import '../favorites/favorites.css';
import FeaturedWidget from '../../components/featuredWidget/featuredWidget';

export default function FeaturedPlaylist() {

  const location = useLocation();
  const dispatch = useDispatch();
  const featuredPlaylist = useSelector((state) => state.featuredPlaylist);

  useEffect(()=>{
    if(location.state){
      dispatch(fetchFeaturedPlaylistItems({id:`${location.state?.featured.id}`}));
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
                <img src={location.state?.featured?.images[0]?.url} alt='playlist-art' className='playlist-pic'/>              
              </div>
            </div>            
            <div className='info'>
              <p className='same'>{location.state?.featured.type}</p>
              <p className='like'>{location.state?.featured.description}</p>
              <p className='same'>{location.state?.featured.name}<span> . </span>{featuredPlaylist.featuredPlaylistItems.length} song(s)</p>
            </div>
          </div>
        </div>
        <div className='lower-body flex'>
          <div className='lower-body-container'>
            {featuredPlaylist.featuredPlaylistItems?.map((item, index) => (
                <FeaturedWidget item={item} index={index}/>
            ))}
          </div>          
        </div>
      </div>
    </div>
  )
}
