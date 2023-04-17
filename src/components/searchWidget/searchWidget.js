import React from 'react';
import './searchWidget.css';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayer } from '../../stores/reducers/favorites';
import { setCurrentIndex, setCurrentTrack, setTracks } from '../../stores/reducers/play';

export default function SearchWidget({item,index}) {
    const artistlist = (temp) => {
        const artists = [];
        temp?.forEach(element => {
            artists.push(element.name)
        })
        return <p className='search-artists' >{artists?.join(' | ')}</p> ;
      };
     
      const dispatch = useDispatch();
      const searchlist = useSelector((state) => state.search.searchlist.tracks)
    
      const handleSearchlist = () => {
        dispatch(setPlayer({player:true}));
        dispatch(setTracks({tracks:searchlist}));
        dispatch(setCurrentTrack({currentTrack:item.track}));
        dispatch(setCurrentIndex({currentIndex:index}));
      }
  return (
    <div className='search-body flex' onClick={()=>handleSearchlist()}>
      <div className='search-info flex'>
        <p className='search-songName'>{item?.track?.name}</p>
        {artistlist(item?.track?.artists)}
      </div>
    </div>
  )
}
