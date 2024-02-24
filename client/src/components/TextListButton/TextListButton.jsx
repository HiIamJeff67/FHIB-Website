import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import { isFilesOrContextsListed, eliminateContextListSign, getContextListSign } from "../../actions/fileSorter.js";

import { IoList } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import "./TextListButton.css";

const TextListButton = ({
	inputText,
	setInputText,
	setProcessedData,
	setUploadFiles,
	setOnTypeMode,
	toast
}) => {
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

	// make sure this will only be execute when text is listed
	const eliminateTextListNumber = function(context) {
		if (!checkTextIsListed(context)) {
			toast.error("Cannot eliminate unListed context");
			return;
		}
		let newContexts = [] = eliminateContextListSign(context);

		setProcessedData(newContexts);
		setUploadFiles(newContexts);
	}

	// make sure this will only be execute when text is not listed
	const getTextListNumber = function(context) {
		if (checkTextIsListed(context)) {
			toast.error("Context invalid form!");
			return;
		}

		let newContexts = getContextListSign(context);
		setProcessedData(newContexts);
		setUploadFiles(newContexts);
	}

	const handleClickDeListButton = function() {
		if (checkTextIsListed(inputText)) {
			eliminateTextListNumber(inputText);
		} else {
			getTextListNumber(inputText);
		}
		setInputText("");
		setIsList(!isList);
		setOnTypeMode(false);
	}

  return (
    <button className='text-list-btn'
						onClick={handleClickDeListButton}>
			{!isList
				? <><IoList /><p>List</p></>
				: <><MdOutlineClear /><p>DeList</p></>}
    </button>
  )
}

TextListButton.propTypes = {
	inputText: PropTypes.string,
	setInputText: PropTypes.func,
	setProcessedData: PropTypes.func,
	setUploadFiles: PropTypes.func,
	setOnTypeMode: PropTypes.func,
	toast: PropTypes.func
}

export default TextListButton;