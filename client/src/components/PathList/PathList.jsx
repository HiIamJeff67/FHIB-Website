import React from 'react';
import { Link } from 'react-router-dom';
import "./PathList.css";

const PathList = () => {
  return (
    <div className='pathlist-container'>
      <h5 className='pathlist-title'>
        <span className='title-border-left'></span>
          <p>List of Functionality</p>
        <span className='title-border-right'></span>
      </h5>
      <div className='pathlist-content'>
        <Link to={"/sortFileInAlphabeticalOrder"} className='btn btn-1'>sort file in Alphabetical Order</Link>
      </div>
    </div>
  )
}

export default PathList