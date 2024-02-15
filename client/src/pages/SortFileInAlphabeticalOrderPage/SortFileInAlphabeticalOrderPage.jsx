import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { stringArrayToValueArray, quickSort } from '../../actions/fileSorter.js';
import "./SortFileInAlphabeticalOrderPage.css";

import { FaFolderClosed, FaFolderOpen } from "react-icons/fa6";
import { IoIosCopy } from "react-icons/io";
import { IoPencil, IoTrash, IoCheckmarkSharp, IoList } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";

const SortFileInAlphabeticalOrderPage = () => {
  const [isHoverIcon, setIsHoverIcon] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [processedData, setProcessedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isCopyAll, setIsCopyAll] = useState(false);
  const [listification, setListification] = useState(false);

  const handleOnDrop = (e) => {
    e.preventDefault();
    setIsHoverIcon(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadFiles((previous) => [...previous, ...files]);
  }
  const handleOnDragOver = (e) => {
    e.preventDefault();
    setIsHoverIcon(true);
  }
  const handleOnDragLeave = (e) => {
    e.preventDefault();
    setIsHoverIcon(false);
  }

  const isEnglishOrNumber = function(character) {
    const chineseRegex = /[\u4e00-\u9fa5]/;
    const englishRegex = /[a-zA-Z]/;
    const numberRegex = /\d/;
    if (chineseRegex.test(character)) {
      console.log("Detect that this files contain chinese!");
    }
    return englishRegex.test(character) || numberRegex.test(character);
  }
  // function to sort the fileName in alphabetical order
  const sortFileInAlphabeticalOrder = function(files) {  // String[] files;
    // make sure that there is no "." character in the String(bcs we will delete all the character after it)
    let processedFiles = [];
    for (let i = 0; i < files.length; i++) {
      let processedFile = [];
      if (typeof files[i] === "object") {
        for (const character of files[i].name) {
          if (character === '.') break;
          if (!isEnglishOrNumber(character)) continue;
          
          processedFile.push(character);
        }
        processedFiles.push(processedFile.join(''));
      } else {
        for (const character of files[i]) {
          if (character === '.') break;
          if (!isEnglishOrNumber(character)) continue;
          
          processedFile.push(character);
        }
        processedFiles.push(processedFile.join(''));
      }
    }

    // sort the file with weight (len - position) * 100
    let values = stringArrayToValueArray(processedFiles);
    const sortedFile = quickSort(values, processedFiles);
    return sortedFile;
  }
  const sortProcess = function() {
    if (uploadFiles !== undefined && uploadFiles.length !== 0) {
      setProcessedData(sortFileInAlphabeticalOrder(uploadFiles));
    }
  }
  useEffect(() => { // start to handle the files
    if (listification) return;
    sortProcess();
  }, [uploadFiles]);

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

  // functions of copying button and copying all button at the bottom
  const handleCopyButtonClick = async (index) => {
    const textToCopy = getTextToCopy(index);
    await copyToClipboard(textToCopy);
    toast.success('Copied!');
  };
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
  const getTextToCopy = (index) => {
    return processedData[index];
  };
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      toast.error('Unable to copy text: ', err);
    }
  };

  const getFileListNumber = function() {
    if (listification) return;
    if (processedData.length === 0) {
      toast.error("There's nothing to listificate!");
      return;
    }
    let newProcessedData = [];
    for (let i = 0; i < processedData.length; i++) {
      newProcessedData[i] = `${i + 1}. ${processedData[i]}`;
    }
    setProcessedData(newProcessedData);
    setUploadFiles(newProcessedData);
    setListification(true);
    toast.success("Listed!");
  }

  const eliminateListNumber = function() {
    if (!listification) return;
    if (processedData.length === 0) {
      toast.error("Something went wrong!");
      return;
    }
    let newProcessedData = [];
    for (let i = 0; i < processedData.length; i++) {
      // 1. name && 10. name
      newProcessedData[i] = 
        (i >= 10 
        ? processedData[i].substring(4)
        : processedData[i].substring(3));
    }
    setProcessedData(newProcessedData);
    setUploadFiles(newProcessedData);
    setListification(false);
    toast.success("Delisted!");
  }

  return (
    <div className='fileSorter-container'>
      <Toaster/>
      <h1 className='fileSorter-header'>Alphabetical Sort</h1>
      <div className='fileSorter-content'>
        <div className='file-input-area'>
          <div className='folder-icon-switcher'
               onDrop={handleOnDrop}
               onDragOver={handleOnDragOver}
               onDragLeave={handleOnDragLeave}
               onMouseEnter={() => setIsHoverIcon(true)}
               onMouseLeave={() => setIsHoverIcon(false)}>
          </div>
          {isHoverIcon ? <FaFolderOpen size={150} className='folder-open-icon'/>
                       : <FaFolderClosed size={150} className='folder-close-icon'/>}
        </div>
        <div className='file-output-area'>
          <div className='file-container-wrapper'>
            <div className='file-container'>
              {processedData.map((data, index) => (
                <div key={index} className='processed-file'>
                  {editingIndex === index
                    ? <input type="text" defaultValue={data} 
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
              ))}
            </div>
            <button className='sort-btn' onClick={() => {
              toast("Sorting");
              setIsSorting(true);
              setUploadFiles(processedData);
              sortProcess();
              setTimeout(() => {
                toast.success("Sorted!");
                setIsSorting(false);
              }, 1500);
            }}>
              {!isSorting
                ? <><GrPowerCycle /><p>Sort</p></>
                : <><IoCheckmarkSharp /><p>Sorted</p></>}
            </button>
            <button className='copy-all-btn' onClick={handleCopyAllButtonClick}>
              {!isCopyAll
                ? <><IoIosCopy /><p>Copy</p></>
                : <><IoCheckmarkSharp /><p>Copied</p></>}
            </button>
            <button className='listing-btn' onClick={() => {
              if (listification) eliminateListNumber();
              else getFileListNumber();
            }}>
                {!listification
                  ?<><IoList /><p>List</p></>
                  :<><IoCheckmarkSharp />Listed</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortFileInAlphabeticalOrderPage;