import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";

import { isFilesOrContextsListed, eliminateContextListSign, getContextListSign } from "../../actions/fileSorter.js";

import { IoList } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import "./TextListButton.css";

import { FileSorterContext } from '../../context/FileSorterContext.jsx';

const TextListButton = ({
	toast
}) => {
	
	const {
		inputText, setInputText,
		setProcessedData,
		setUploadFiles,
		setOnTypeMode
	} = useContext(FileSorterContext);
	const [isList, setIsList] = useState(false);

	useEffect(() => {
		setIsList(checkTextIsListed(inputText));
	}, [inputText]);

	const checkTextIsListed = function(context) {
		const unprocessedContexts = context.split('\n');
		const detectedProcessedContexts = unprocessedContexts.filter(element => element !== "");
		const numOfContexts = unprocessedContexts.length;
		if (numOfContexts === 0 || detectedProcessedContexts.length === 0) {
			return false;
		}
		
		return isFilesOrContextsListed(unprocessedContexts);
	}

	const handleClickTextListButton = async function() {
		if (!inputText || inputText === undefined || inputText.length === 0) {
			toast.error("There's No Context to List or Delist!")
			return;
		}
		if (checkTextIsListed(inputText)) {
			let newContexts = [] = eliminateContextListSign(inputText);
			setProcessedData(newContexts);
			setUploadFiles(newContexts);
		} else {
			let newContexts = getContextListSign(inputText);
			setProcessedData(newContexts);
			setUploadFiles(newContexts);
		}
		setInputText("");
		setIsList(!isList);
		setOnTypeMode(false);
	}

  return (
    <button className='text-list-btn' onClick={handleClickTextListButton}>
			{!isList
				? <><IoList /><p>List</p></>
				: <><MdOutlineClear /><p>DeList</p></>}
    </button>
  )
}

// TextListButton.propTypes = {
// 	sortProcess: PropTypes.func,
// 	toast: PropTypes.func
// }

export default TextListButton;