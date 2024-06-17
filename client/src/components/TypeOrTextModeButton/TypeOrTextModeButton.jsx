import React, { useContext } from 'react';
import PropTypes from "prop-types";

import { FiType, FiFile } from "react-icons/fi";
import "./TypeOrTextModeButton.css";

import { FileSorterContext } from '../../context/FileSorterContext';

const TypeOrTextModeButton = () => {

  const { onTypeMode, setOnTypeMode } = useContext(FileSorterContext);

  return (
    <button className='type-text-mode-btn'
            onClick={() => setOnTypeMode(!onTypeMode)}>
			{onTypeMode
				? <><FiFile /><p>FileMode</p></>
				: <><FiType /><p>TypeMode</p></>}
    </button>
  )
}

export default TypeOrTextModeButton