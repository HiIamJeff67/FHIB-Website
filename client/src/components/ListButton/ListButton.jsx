import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";

import { eliminateContextListSign, getContextListSign, isFilesOrContextsListed } from "../../actions/fileSorter.js";

import { IoCheckmarkSharp, IoList } from "react-icons/io5";
import "./ListButton.css";

import { FileSorterContext } from '../../context/FileSorterContext.jsx';

const ListButton = ({ 
	toast 
}) => {

	const {
		listification, setListification,
		processedData, setProcessedData,
		uploadFiles, setUploadFiles
	} = useContext(FileSorterContext);
	useEffect(() => {
		setListification(isFilesOrContextsListed(processedData));
	}, [processedData]);

	const eliminateDataListNumber = function() {
		if (!listification) return;
		if (processedData.length === 0) {
			toast.error("Something went wrong!");
			return;
		}
		let newProcessedData = eliminateContextListSign(processedData);
		setProcessedData(newProcessedData);
		// setUploadFiles(newProcessedData);
		setListification(false);
		toast.success("Delisted!");
	}

	const getFileListNumber = function() {
		if (listification) return;
		if (processedData.length === 0) {
			toast.error("There's nothing to listificate!");
			return;
		}
		
		let newProcessedData = getContextListSign(processedData);
		setProcessedData(newProcessedData);
		// setUploadFiles(newProcessedData);
		setListification(true);
		toast.success("Listed!");
	}

  return (
    <button className='listing-btn'
			onClick={() => {
				listification 
					? eliminateDataListNumber() 
					: getFileListNumber()
			}}>
		{!listification
			? <><IoList /><p>List</p></>
			: <><IoCheckmarkSharp /><p>Listed</p></>}
    </button>
  )
}

ListButton.propTypes = {
	toast: PropTypes.func
}

export default ListButton;