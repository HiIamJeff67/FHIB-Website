import React from 'react';
import PropTypes from "prop-types";

import { FiType, FiFile } from "react-icons/fi";
import "./TypeOrTextModeButton.css";

const TypeOrTextModeButton = ({
    onTypeMode,
    setOnTypeMode,
}) => {
  return (
    <button className='type-text-mode-btn'
            onClick={() => setOnTypeMode(!onTypeMode)}>
			{onTypeMode
				? <><FiFile /><p>FileMode</p></>
				: <><FiType /><p>TypeMode</p></>}
    </button>
  )
}

TypeOrTextModeButton.propType = {
  onTypeMode: PropTypes.bool,
  setOnTypeMode: PropTypes.func
}

export default TypeOrTextModeButton