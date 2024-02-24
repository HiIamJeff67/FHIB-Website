import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./PathList.css";

const PathList = (props) => {
  const navigate = useNavigate();

  const goToNormalAlphabeticalOrderPage = () => {
    navigate("/sortFileInAlphabeticalOrder");
    props.setSidebarState(false);
  }
  const switchSpotifyAlphabeticalOrderPage = () => {
    navigate("/sortSpotifyFileInAlphabeticalOrder");
    props.setSidebarState(false);
  }

  return (
    <div className='pathlist-container'>
      <h5 className='pathlist-title'>
        <span className='title-border-left'></span>
          <p>List of Functionality</p>
        <span className='title-border-right'></span>
      </h5>
      <div className='pathlist-content'>
        <div className='btn btn-1'
             onClick={goToNormalAlphabeticalOrderPage}>
            Sort Files
        </div>
        <div className='btn btn-2'
             onClick={switchSpotifyAlphabeticalOrderPage}>
            Sort Spotify Files
        </div>
      </div>
    </div>
  )
}

export default PathList;