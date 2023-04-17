import React from 'react';
import './favWidget.css';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayer } from '../../stores/reducers/favorites';
import { setCurrentIndex, setCurrentTrack, setTracks } from '../../stores/reducers/play';

export default function FavWidget({item, index}) {
  const artistlist = (temp) => {
    const artists = [];
    temp?.forEach(element => {
        artists.push(element.name)
    })
    return <p className='artists' >{artists?.join(' | ')}</p> ;
  };
 
  const dispatch = useDispatch();
  const LikedSongs = useSelector((state) => state.favorites.likedSongs)

  const handleFavorite = () => {
    dispatch(setPlayer({player:true}));
    dispatch(setTracks({tracks:LikedSongs}));
    dispatch(setCurrentTrack({currentTrack:item.track}));
    dispatch(setCurrentIndex({currentIndex:index}));
  }

  return (
    <div className='widget-body flex' onClick={()=>handleFavorite()}>
      <div className='img-box'><img src={item.track.album.images[2].url} alt='album-art' className='widget-image'/></div>        
      <div className='widget-info  flex'>
        <p className='songName'>{item.track.name}</p>
        {artistlist(item.track.artists)}
      </div>
      <div className='widget-box flex'><p>{item.track.album.name}</p></div>
      <div className='widget-box flex'><p>{item.added_at.split('T')[0]}</p></div>       
    </div>
  )
}
