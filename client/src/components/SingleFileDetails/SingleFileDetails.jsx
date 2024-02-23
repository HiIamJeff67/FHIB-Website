import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { copyToClipboard } from '../../actions/copyToClipboard';

import { IoIosCopy } from "react-icons/io";
import { IoPencil, IoTrash } from 'react-icons/io5';
import "./SingleFileDetails.css";

const SingleFileDetails = ({
	data,
	index,
	processedData,
	setProcessedData,
	setUploadFiles,
	toast
}) => {
	const [editingIndex, setEditingIndex] = useState(-1)


	// functions of editing button
  const handleEditFileName = function(index, newFileName) {
    let newProcessedData = [];
    for (let i = 0; i < processedData.length; i++) {
      if (i === index) newProcessedData.push(newFileName);
      else newProcessedData.push(processedData[i]);
    }
    setProcessedData(newProcessedData);
  }
  const handleEditSubmit = function(event) {
    if (event.key === "Enter") {
      setUploadFiles(processedData);
      event.target.blur();
    }
  }

	// function of deleting button
	const deleteFileAt = function(index) {
		let newProcessedData = [];
		for (let i = 0; i < processedData.length; i++) {
			if (i !== index) {
				newProcessedData.push(processedData[i]);
			}
		}
		setProcessedData(newProcessedData);
		setUploadFiles(newProcessedData);
	}

	// functions of copying button
  const handleCopyButtonClick = async (index) => {
    const textToCopy = processedData[index];
    await copyToClipboard(textToCopy);
    toast.success('Copied!');
  };

  return (
    <div key={index} className='processed-file'>
      {editingIndex === index
        ? <input type="text" 
						defaultValue={data} 
            className='editing-file-name' 
            onChange={(event) => handleEditFileName(index, event.target.value)}
						onKeyDown={handleEditSubmit}
            onBlur={() => setEditingIndex(-1)}/>
        : <p className='file-name'>{data}</p>}
				
        <button className='file-btn edit-button'
          			onClick={() => setEditingIndex(index)}>
        	<IoPencil size={20}/>
        </button>
        <button className='file-btn copy-button'
                onClick={() => handleCopyButtonClick(index)}>
         	<IoIosCopy size={20}/>
        </button>
        <button className='file-btn delete-button'
           			onClick={() => deleteFileAt(index)}>
          <IoTrash size={20}/>
        </button>
    	</div>
  )
}

SingleFileDetails.propTypes = {
	data: PropTypes.string,
	index: PropTypes.number,
	processedData: PropTypes.array,
	setProcessedData: PropTypes.func,
	setUploadFiles: PropTypes.func,
	toast: PropTypes.func
}

export default SingleFileDetails;