import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

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

	const isNumber = function(value) {
		const parsedNumber = Number(value);
		return ((typeof value === 'number') && !isNaN(value)
						|| (typeof parsedNumber === 'number' && !isNaN(parsedNumber)));
	}

	const checkTextIsListed = function(context) {
		const unprocessedContexts = context.split('\n');
		const detectedProcessedContexts = unprocessedContexts.filter(element => element !== "");
		const numOfContexts = unprocessedContexts.length;
		if (numOfContexts === 0 || detectedProcessedContexts.length === 0) {
			return false;
		}

		let count = 0;
		for (let i = 0; i < numOfContexts; i++) {
			// 1. name
			if ((unprocessedContexts[i].substring(1, 3) === ". "
				|| unprocessedContexts[i].substring(2, 4) === ". "
				|| unprocessedContexts[i].substring(3, 5) === ". ")
					&& isNumber(unprocessedContexts[i][0])) {
				count++;
			} else {
				return false;
			}
		}
		if (count === numOfContexts) return true;
		else return false;
	}

	// make sure this will only be execute when text is listed
	const eliminateTextListNumber = function(context) {
		if (!checkTextIsListed(context)) {
			toast.error("Cannot eliminate unListed context");
			return;
		}
		let contexts = context.split('\n');
		let newContexts = [], newPtr = 0;
		for (let i = 0; i < context.length; i++) {
			// 1. name
			if (contexts[i] !== undefined) {
				newContexts[newPtr++] = contexts[i].substring(3);
			}
		}
		setProcessedData(newContexts);
		setUploadFiles(newContexts);
	}

	// make sure this will only be execute when text is not listed
	const getTextListNumber = function(context) {
		if (checkTextIsListed(context)) {
			toast.error("Context invalid form!");
			return;
		}
		const contexts = context.split('\n');
		let newContexts = [], newPtr = 0;
		for (let i = 0; i < context.length; i++) {
			if (contexts[i] !== undefined) {
				newContexts[newPtr++] = `${i + 1}. ${contexts[i]}`;
			}
		}
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