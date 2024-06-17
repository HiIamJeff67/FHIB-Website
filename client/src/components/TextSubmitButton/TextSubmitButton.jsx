import React, { useContext } from 'react';
import PropTypes from "prop-types";

import { IoCheckmarkSharp } from "react-icons/io5";
import "./TextSubmitButton.css";

import { FileSorterContext } from '../../context/FileSorterContext';

const TextSubmitButton = ({
	toast
}) => {
  
  const {
    inputText, setInputText,
    setProcessedData,
    setUploadFiles,
    setOnTypeMode
  } = useContext(FileSorterContext);

	// function of submit text in textarea
  const handleTextSubmit = function() {
    const uploadText = inputText.split('\n').filter(element => element !== "");
    if (uploadText.length !== 0) {
      setProcessedData(uploadText);
      setUploadFiles(uploadText);
    } else {
      toast.error("Please Type Some Text to Submit!")
      return;
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
	toast: PropTypes.func
}

export default TextSubmitButton