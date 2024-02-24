import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import { eliminateContextListSign, getContextListSign, isFilesOrContextsListed } from "../../actions/fileSorter.js";

import { IoCheckmarkSharp, IoList } from "react-icons/io5";
import "./ListButton.css";

const ListButton = ({ 
	listification, 
	setListification, 
	processData, 
	setProcessData, 
	setUploadFiles, 
	toast 
}) => {
	useEffect(() => {
		setListification(isFilesOrContextsListed(processData));
	}, [processData]);

	const eliminateDataListNumber = function() {
		if (!listification) return;
		if (processData.length === 0) {
			toast.error("Something went wrong!");
			return;
		}
		let newProcessedData = eliminateContextListSign(processData);
		
		setProcessData(newProcessedData);
		setUploadFiles(newProcessedData);
		setListification(false);
		toast.success("Delisted!");
	}

	const getFileListNumber = function() {
		if (listification) return;
		if (processData.length === 0) {
			toast.error("There's nothing to listificate!");
			return;
		}
		let newProcessedData = getContextListSign(processData);
		setProcessData(newProcessedData);
		setUploadFiles(newProcessedData);
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
	listification: PropTypes.bool,
	setListification: PropTypes.func,
	processData: PropTypes.array,
	setProcessData: PropTypes.func,
	setUploadFiles: PropTypes.func,
	toast: PropTypes.func
}

export default ListButton;