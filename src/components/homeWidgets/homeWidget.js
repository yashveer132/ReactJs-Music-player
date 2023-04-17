import React from 'react';
import './homeWidget.css';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPlayer } from '../../stores/reducers/favorites';
import { setCurrentIndex, setCurrentTrack, setTracks } from '../../stores/reducers/play';

export default function HomeWidget({title, recentPlay, featuredPlaylist}) {
    const artistlist1 = (temp) => {
        const artists = [];
        temp?.track?.artists?.forEach(element => {
            artists.push(element.name)
        })
        return <p className='song-artists' >{artists?.join(' | ')}</p> ;
    };

    const dispatch = useDispatch();

    const handleRecentPlaylist = (index) => {
        dispatch(setPlayer({player:true}));
        dispatch(setTracks({tracks:recentPlay}));
        dispatch(setCurrentTrack({currentTrack:recentPlay[0].track}));
        dispatch(setCurrentIndex({currentIndex:index}));
    }

    const navigate = useNavigate();

    const playNewrelease = (featured) => {
        navigate('/featuredplaylist', {state:{featured:featured}});
    };

  return (
    <div className='homeWidget-body flex'>
        <p className='title'>{title}</p>
        <div className='widget-container flex'>
            { recentPlay ? recentPlay.map((recent, index) => (
                <div className='widget-card flex' key={recent.id} onClick={()=>handleRecentPlaylist(index)}>
                    <img src={recent?.track?.album?.images[0]?.url} className='widget-img' alt='Widget-Art'></img>
                    <p className='song-name' >{recent?.track?.name}</p> 
                    {artistlist1(recent)}
                    <div className='widget-play'>
                        <IconContext.Provider value={{size:"50px", color:"#ff359b", style:{opacity:.7, padding:'5px'} }}>
                            <AiFillPlayCircle/>
                        </IconContext.Provider>  
                    </div>
                </div>
                )) : featuredPlaylist ? featuredPlaylist.map((featured) => (
                    <div className='widget-card flex' key={featured.id} onClick={()=>playNewrelease(featured)}> 
                        <img src={featured?.images[0]?.url} className='widget-img' alt='Widget-Art'></img>
                        <p className='song-name' >{featured?.name}</p> 
                        <p className='song-artists' >{featured?.description}</p>
                        <div className='widget-play'>
                            <IconContext.Provider value={{size:"50px", color:"#ff359b", style:{opacity:.7, padding:'5px'} }}>
                                <AiFillPlayCircle/>
                            </IconContext.Provider>  
                        </div>
                    </div>
                    )) : null
            }
        </div>       
    </div>
  )
}