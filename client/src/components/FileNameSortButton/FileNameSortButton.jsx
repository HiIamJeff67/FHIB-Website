import React from 'react';
import PropTypes from "prop-types";

import { GrPowerCycle } from "react-icons/gr";
import { IoCheckmarkSharp } from "react-icons/io5";
import "./FileNameSortButton.css";

const FileNameSortButton = ({
    isSorting,
    setIsSorting,
    processedData,
    setUploadFiles,
    sortProcess,
    toast
}) => {
  return (
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
  )
}

FileNameSortButton.propTypes = {
    isSorting: PropTypes.bool,
    setIsSorting: PropTypes.func,
    processedData: PropTypes.array,
    setUploadFiles: PropTypes.func,
    sortProcess: PropTypes.func,
    toast: PropTypes.func
}

export default FileNameSortButton