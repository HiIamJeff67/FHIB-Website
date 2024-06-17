import React, { useContext, useState } from 'react';
import PropTypes from "prop-types";

import { copyToClipboard } from '../../actions/copyToClipboard';

import { IoIosCopy } from "react-icons/io";
import { IoCheckmarkSharp } from 'react-icons/io5';
import "./CopyAllTextButton.css";

import { FileSorterContext } from '../../context/FileSorterContext';

const CopyAllTextButton = ({
	toast
}) => {

  const { processedData } = useContext(FileSorterContext);
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
	toast: PropTypes.func
}

export default CopyAllTextButton