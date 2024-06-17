import React, { useContext } from 'react';
import PropTypes from "prop-types";

import { GrPowerCycle } from "react-icons/gr";
import { IoCheckmarkSharp } from "react-icons/io5";
import "./FileNameSortButton.css";

import { FileSorterContext } from '../../context/FileSorterContext';

const FileNameSortButton = ({
    sortProcess,
    toast
}) => {

  const {
    isSorting, setIsSorting,
    processedData,
    setUploadFiles,
  } = useContext(FileSorterContext);

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
    sortProcess: PropTypes.func,
    toast: PropTypes.func
}

export default FileNameSortButton