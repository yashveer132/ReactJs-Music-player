import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from '../../components/sidebar';
import { setClientToken } from '../../spotify';
import Login from '../auth/login';
import Favorites from '../favorites/favorites';
import Home from '../home/home';
import Library from '../library/library';
import Play from '../play/play';
import Player from '../player/player';
import Search from '../search/search';
import './router.css';
import { useSelector } from 'react-redux';
import FeaturedPlaylist from '../featuredPlaylist/featuredPlaylist';
import Signout from '../signout/signout';


export default function Path() {
  const [token, setToken] = useState("");
  const player = useSelector((state) => state.favorites.player.player)

  useEffect(()=>{
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    if(!token && hash){
    const _token = hash.split("&")[0].split("=")[1];
    window.localStorage.setItem("token",_token);
    setToken(_token);
    setClientToken(_token);
    }else{
      setToken(token);
      setClientToken(token);
    }
  },[])

  function handleLogout() {
    window.localStorage.removeItem("token");
    setToken("");
  }

  return !window.localStorage.getItem("token") ? 
  (
    <Login/>
  ) : 
  (
    <Router>
      <div className={player ? 'main-body active' : 'main-body'}>
        <Sidebar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/library' element={<Library/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/player' element={<Player/>}/>
              <Route path='/featuredplaylist' element={<FeaturedPlaylist/>}/>
              <Route path='/favorites' element={<Favorites/>}/>
              <Route path='/signout' element={<Signout handleLogout={handleLogout}/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
      </div> 
      {player ? <Play/> : null}
    </Router>
  )
}
