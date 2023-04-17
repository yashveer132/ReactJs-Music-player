import React, { useEffect, useRef, useState } from 'react';
import './search.css';
import { IconContext } from 'react-icons';
import { IoSearch, IoClose } from "react-icons/io5";
import { fetchSearchTracks } from '../../stores/utils/thunks';
import { useDispatch, useSelector } from 'react-redux';
import SearchWidget from '../../components/searchWidget/searchWidget';

export default function Search() {
  const textInput = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [temp, setTemp] = useState(false);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(searchTerm !== ''){
      setTemp(true);
      dispatch(fetchSearchTracks({query:`${searchTerm}`}));     
    }
    if(searchTerm === ''){
      setTemp(false)
    }  
  },[searchTerm])

  const handleSearch = () => {
    setSearchTerm(textInput.current.value)
    setTemp(true);
  }
  const handleClear = () => {
    textInput.current.value='';
    setTemp(false);
  }
  return (
    <div className='screen-container'>
      <div className='color'></div>
      <div className='color'></div>
      <div className='color'></div>
      <div className='main-container'>
        <div className='search-box'>
          <div className='search'>
            <div className='icon'>
              <IconContext.Provider value={{size:'25px',color:"rgb(255,53,155)"}}>
                {<IoSearch/>}
              </IconContext.Provider>
            </div>
            <div className='input'>
              <input type='text' placeholder='Search for your songs' name='songs' ref={textInput} onChange={handleSearch}/>
            </div>
            <span className='clear' onClick={handleClear}>
              <IconContext.Provider value={{size:'25px',color:"rgb(255,53,155)"}}>
                {<IoClose/>}
              </IconContext.Provider>
            </span>
          </div>
        </div>
        <div className='search-list'>
          <div className='search-container'>
            {temp ? search.searchlist?.tracks?.map((item, index) => (
              <SearchWidget item={item} index={index}/>
            )):null}
          </div>
        </div>
      </div>
    </div>
  )
}
