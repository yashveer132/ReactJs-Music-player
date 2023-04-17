import React, { useEffect, useState } from 'react';
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { MdFavorite } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary, IoSearch } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import appClient from '../../spotify';



export default function Sidebar() {

  const [image, setImage] = useState('https://i0.wp.com/www.tycoonstory.com/wp-content/uploads/2022/07/Anime-Profile-Pictures-Tycoonstory.jpg?w=500&ssl=1')
  useEffect(()=>{
    appClient.get("me").then(response => {setImage(response.data.images[0].url);});
  },[])

  return (
    <div className='sidebar-container'>
        <img src={image} className='profile-img' alt='profile'/>
        <div>
            <SidebarButton title="Home" to="/" icon={<HiHome/>}/>
            <SidebarButton title="Search" to="/search" icon={<IoSearch/>}/>
            <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite/>}/>
            <SidebarButton title="Library" to="/library" icon={<IoLibrary/>}/>
        </div>
        <SidebarButton title="Sign Out" to="/signout" icon={<FaSignOutAlt/>}/>
    </div>   
  )
}
