import React from 'react';
import PropTypes from "prop-types";

import { IoCheckmarkSharp } from "react-icons/io5";
import "./TextSubmitButton.css";

const TextSubmitButton = ({
	inputText,
	setInputText,
	setProcessedData,
	setUploadFiles,
	setOnTypeMode,
	toast
}) => {
	// function of submit text in textarea
  const handleTextSubmit = function() {
    const uploadText = inputText.split('\n').filter(element => element !== "");
    if (uploadText.length !== 0) {
      setProcessedData(uploadText);
      setUploadFiles(uploadText);
    } else {
      toast.error("Please Type Some Text to Submit!")
    }
    setInputText("");
    setOnTypeMode(false);
  }
	
  return (
    <button className='text-submit-btn'
        		onClick={handleTextSubmit}>
      <><IoCheckmarkSharp /><p>Submit</p></>
    </button>
  )
}

TextSubmitButton.propTypes = {
	inputText: PropTypes.string,
	setInputText: PropTypes.func,
	setProcessedData: PropTypes.func,
	setUploadFiles: PropTypes.func,
	setOnTypeMode: PropTypes.func,
	toast: PropTypes.func
}

export default TextSubmitButton