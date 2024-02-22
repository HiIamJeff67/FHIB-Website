import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import "./SortFileInAlphabeticalOrderPage.css";

import { sortFileInAlphabeticalOrder } from '../../actions/fileSorter.js';
import TextListButton from '../../components/TextListButton/TextListButton.jsx';
import TypeOrTextModeButton from '../../components/TypeOrTextModeButton/TypeOrTextModeButton.jsx'
import TextSubmitButton from '../../components/TextSubmitButton/TextSubmitButton.jsx';
import SingleFileDetails from '../../components/SingleFileDetails/SingleFileDetails.jsx';
import ClearButton from '../../components/ClearButton/ClearButton.jsx';
import FileNameSortButton from '../../components/FileNameSortButton/FileNameSortButton.jsx';
import CopyAllTextButton from '../../components/CopyAllTextButton/CopyAllTextButton.jsx';
import ListButton from '../../components/ListButton/ListButton.jsx';

import { FaFolderClosed, FaFolderOpen } from "react-icons/fa6";

const SortFileInAlphabeticalOrderPage = () => {
  const [isHoverIcon, setIsHoverIcon] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [processedData, setProcessedData] = useState([]);
  const [listification, setListification] = useState(false);
  const [onTypeMode, setOnTypeMode] = useState(false);
  const [inputText, setInputText] = useState("");

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
      setProcessedData(sortFileInAlphabeticalOrder(uploadFiles));
    }
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
                <TextSubmitButton 
                  inputText={inputText}
                  setInputText={setInputText}
                  setProcessedData={setProcessedData}
                  setUploadFiles={setUploadFiles}
                  setOnTypeMode={setOnTypeMode}
                  toast={toast}
                />
                <TextListButton 
                  inputText={inputText}
                  setInputText={setInputText}
                  setProcessedData={setProcessedData}
                  setUploadFiles={setUploadFiles}
                  setOnTypeMode={setOnTypeMode}
                  toast={toast}
                />
              </>
            }
            <TypeOrTextModeButton 
              onTypeMode={onTypeMode}
              setOnTypeMode={setOnTypeMode}
            />
          </div>
        </div>
        <div className='file-output-area'>
          <div className='file-container-wrapper'>
            <div className='file-container'>
              {processedData.map((data, index) => (
                <>  {/* fix the key here in the future */}
                  <SingleFileDetails 
                    data={data}
                    index={index} // === key
                    processedData={processedData}
                    setProcessedData={setProcessedData}
                    setUploadFiles={setUploadFiles}
                    toast={toast}
                  />
                </>
              ))}
            </div>
            <div className='file-btn-wrapper'>
              <ClearButton 
                processedData={processedData}
                setProcessedData={setProcessedData}
                setUploadFiles={setUploadFiles}
                toast={toast}/>
              <FileNameSortButton 
                isSorting={isSorting}
                setIsSorting={setIsSorting}
                processedData={processedData}
                setUploadFiles={setUploadFiles}
                sortProcess={sortProcess}
                toast={toast}
              />
              <CopyAllTextButton 
                processedData={processedData}
                toast={toast}
              />
              <ListButton 
                listification={listification}
                setListification={setListification}
                processData={processedData}
                setProcessData={setProcessedData}
                setUploadFiles={setUploadFiles}
                toast={toast}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortFileInAlphabeticalOrderPage;