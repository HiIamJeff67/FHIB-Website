import React from 'react';
import PropTypes from "prop-types";

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
	const getFileListNumber = function() {
		if (listification) return;
		if (processData.length === 0) {
			toast.error("There's nothing to listificate!");
			return;
		}
		let newProcessedData = [];
		for (let i = 0; i < processData.length; i++) {
			newProcessedData[i] = `${i + 1}. ${processData[i]}`;
		}
		setProcessData(newProcessedData);
		setUploadFiles(newProcessedData);
		setListification(true);
		toast.success("Listed!");
	}

	const eliminateListNumber = function() {
		if (!listification) return;
		if (processData.length === 0) {
			toast.error("Something went wrong!");
			return;
		}
		let newProcessedData = [];
		for (let i = 0; i < processData.length; i++) {
			// 1. name && 10. name
			newProcessedData[i] =
				i >= 10
				? processData[i].substring(4)
				: processData[i].substring(3);
		}
		setProcessData(newProcessedData);
		setUploadFiles(newProcessedData);
		setListification(false);
		toast.success("Delisted!");
	}


  return (
    <button className='listing-btn'
			onClick={() => {
				listification 
					? eliminateListNumber() 
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