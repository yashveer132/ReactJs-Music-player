import React, { useState, useRef, useEffect } from 'react';
import './play.css';
import {IconContext} from 'react-icons';
import { IoPlaySkipBack, IoPlay, IoPause, IoPlaySkipForward, IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { setPlayer } from '../../stores/reducers/favorites';
import { setCurrentIndex, setCurrentTrack } from '../../stores/reducers/play';


export default function Play() {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state)=> state.play.currentTrack.currentTrack);
  const currentIndex = useSelector((state)=> state.play.currentIndex.currentIndex);
  const tracks = useSelector((state)=> state.play.tracks.tracks);

  const artists = [];
    currentTrack?.artists?.forEach(element => {
    artists.push(element.name)
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  var audioSrc = tracks[currentIndex]?.track.preview_url;
  const audioRef = useRef(new Audio(tracks[0]?.track.preview_url));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const {duration} = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
  const waveClass = isPlaying ? "box active" : "box";

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(()=>{
      if(audioRef.current.ended){
        handleNext();
      }else{
        setTrackProgress(audioRef.current.currentTime);
      }
    },[1000]);
  };

  useEffect(() => {
    if(audioRef.current.src){
      if(isPlaying){
        audioRef.current.play();
        startTimer();
      }else{
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }else{
      if(isPlaying){
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      }else{
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } 
  },[isPlaying]);

  useEffect(()=>{
    dispatch(setCurrentTrack({currentTrack:tracks[currentIndex]?.track}));
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    if(isReady.current){
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    }else{
      isReady.current = true;
    }   
  },[currentIndex,audioSrc]);

  useEffect(()=>{
    return()=>{
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  },[]);

  const handleNext = () => {
    if(currentIndex < tracks.length - 1){
      dispatch(setCurrentIndex({currentIndex:currentIndex + 1}));
    }else{
      dispatch(setCurrentIndex({currentIndex:0}));
    }
  }

  const handlePrev = () => {
    if(currentIndex - 1 < 0){
      dispatch(setCurrentIndex({currentIndex:tracks.length - 1}));
    }else{
      dispatch(setCurrentIndex({currentIndex:currentIndex - 1}));
    }
  }

  const addZero = (n) => {
    return n > 9 ? ""+n : "0"+n;
  }

  return (
    <div className='play-container'>
      <div className='playOpenClose' onClick={()=>dispatch(setPlayer({player:false}))}>
        <IoClose/>
      </div>
      <div className='songInfoMain'>
        <img src={currentTrack?.album?.images[2]?.url} alt='coverPage' className='playImage'/>
        <div className='songInfo'>
          <p className='songNameInfo'>{currentTrack?.name}</p>
          <p className='songArtists'>{artists.join(" | ")}</p>
        </div>
      </div>
      <div className='box-container flex'>
        <div className={`${waveClass} box1`}></div>
        <div className={`${waveClass} box2`}></div>
        <div className={`${waveClass} box3`}></div>
        <div className={`${waveClass} box4`}></div>
        <div className={`${waveClass} box5`}></div>
        <div className={`${waveClass} box6`}></div>
        <div className={`${waveClass} box7`}></div>
        <div className={`${waveClass} box2`}></div>
        <div className={`${waveClass} box3`}></div>
        <div className={`${waveClass} box4`}></div>
        <div className={`${waveClass} box5`}></div>
        <div className={`${waveClass} box6`}></div>
        <div className={`${waveClass} box7`}></div>
      </div>
      <div className='progressBar'>
        <p className='songDuration'>0:{addZero(Math.round(trackProgress))}</p>
        <div className='base'><div className='percent' style={{width:`${currentPercentage}%`}}></div></div>
        <p className='songDuration'>0:30</p>
      </div>
      <div className='contolIcons'>
        <IconContext.Provider value={{size: "25px", color: "#fff"}}>
          <div className='btn flex' onClick={handlePrev}><IoPlaySkipBack/></div>
          <div className={isPlaying ? 'btn active flex':'btn flex'} onClick={()=>setIsPlaying(!isPlaying)}>
            {isPlaying ? <IoPause/> : <IoPlay/>}
          </div>
          <div className='btn flex' onClick={handleNext}><IoPlaySkipForward/></div>
        </IconContext.Provider>
      </div>
    </div>
  )
}
