import React, { useState, useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import "./SortFileInAlphabeticalOrderPage.css";

import { sortFileInAlphabeticalOrder, sortFileInAlphabeticalOrderInSpotifyMode } from '../../actions/fileSorter.js';
import TextListButton from '../../components/TextListButton/TextListButton.jsx';
import TypeOrTextModeButton from '../../components/TypeOrTextModeButton/TypeOrTextModeButton.jsx'
import TextSubmitButton from '../../components/TextSubmitButton/TextSubmitButton.jsx';
import SingleFileDetails from '../../components/SingleFileDetails/SingleFileDetails.jsx';
import ClearButton from '../../components/ClearButton/ClearButton.jsx';
import FileNameSortButton from '../../components/FileNameSortButton/FileNameSortButton.jsx';
import CopyAllTextButton from '../../components/CopyAllTextButton/CopyAllTextButton.jsx';
import ListButton from '../../components/ListButton/ListButton.jsx';

import { FaFolderClosed, FaFolderOpen } from "react-icons/fa6";

import { FileSorterContext } from '../../context/FileSorterContext.jsx';


const SortFileInAlphabeticalOrderPage = ({
  isSpotifyFile
}) => {

  const {
    onTypeMode,
    isHoverIcon, setIsHoverIcon,
    listification,
    inputText, setInputText,
    uploadFiles, setUploadFiles,
    processedData, setProcessedData
  } = useContext(FileSorterContext);

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

  const sortProcess = function() {
    if (uploadFiles !== undefined && uploadFiles.length !== 0) {
      const sortedFiles = (isSpotifyFile)
        ? sortFileInAlphabeticalOrderInSpotifyMode(uploadFiles)
        : sortFileInAlphabeticalOrder(uploadFiles);
      setProcessedData(sortedFiles);
    }
    // console.log("sorting...")
  }
  useEffect(() => { // start to handle the files
    if (listification) return;
    sortProcess();
  }, [uploadFiles]);

  return (
    <div className='fileSorter-container'>
      <Toaster/>
      <h1 className='fileSorter-header'>Alphabetical Sort</h1>
      <div className='fileSorter-content'>
        <div className='file-input-area'>
          {onTypeMode
            ? <textarea type="text"
                        className='fileName-input-area'
                        defaultValue={inputText}
                        onChange={(e) => setInputText(e.target.value)}/>
            : <>
                <div className='folder-icon-switcher'
                    onDrop={handleOnDrop}
                    onDragOver={handleOnDragOver}
                    onDragLeave={handleOnDragLeave}
                    onMouseEnter={() => setIsHoverIcon(true)}
                    onMouseLeave={() => setIsHoverIcon(false)}>
                </div>
                {isHoverIcon ? <FaFolderOpen size={150} className='folder-open-icon'/>
                             : <FaFolderClosed size={150} className='folder-close-icon'/>}
          </>}
          <div className='file-btn-wrapper'>
            {onTypeMode &&
              <>
                <TextSubmitButton toast={toast}/>
                <TextListButton toast={toast}/>
              </>
            }
            { !isSpotifyFile && 
                <TypeOrTextModeButton />
            }
          </div>
        </div>
        <div className='file-output-area'>
          <div className='file-container-wrapper'>
            <div className='file-container'>
              {processedData
                ? <>
                  {processedData.map((data, index) => (
                    <div key={index} 
                        style={{width: "100%", 
                                display: "flex",
                                justifyContent: "center"}}>
                      <SingleFileDetails 
                        data={data}
                        index={index} // === key
                        processedData={processedData}
                        setProcessedData={setProcessedData}
                        setUploadFiles={setUploadFiles}
                        toast={toast}
                      />
                    </div>
                  ))}
                </>
                : <></>
              }
              
            </div>
            <div className='file-btn-wrapper'>
              <ClearButton toast={toast}/>
              <FileNameSortButton sortProcess={sortProcess} toast={toast}/>
              <CopyAllTextButton toast={toast}/>
              <ListButton toast={toast}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortFileInAlphabeticalOrderPage;