import React, { useState } from 'react';
import PropTypes from "prop-types";

import { copyToClipboard } from '../../actions/copyToClipboard';

import { IoIosCopy } from "react-icons/io";
import { IoCheckmarkSharp } from 'react-icons/io5';
import "./CopyAllTextButton.css";

const CopyAllTextButton = ({
	processedData,
	toast
}) => {
	const [isCopyAll, setIsCopyAll] = useState(false);

	const handleCopyAllButtonClick = async () => {
    const textsToCopy = processedData.join(`\n`);
    if (textsToCopy === "") {
      setIsCopyAll(false);
      toast.error("There's nothing to copy!");
      return;
    }
    setIsCopyAll(true);
    await copyToClipboard(textsToCopy);
    setTimeout(() => {
      setIsCopyAll(false);
    }, 1500);
    toast.success('Copied!');
  }

  return (
    <button className='copy-all-btn' 
						onClick={handleCopyAllButtonClick}>
      {!isCopyAll
        ? <><IoIosCopy /><p>Copy</p></>
        : <><IoCheckmarkSharp /><p>Copied</p></>}
    </button>
  )
}

CopyAllTextButton.propTypes = {
	processedData: PropTypes.array,
	toast: PropTypes.func
}

export default CopyAllTextButton