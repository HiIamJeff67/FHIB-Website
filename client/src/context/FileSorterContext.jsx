import { createContext, useState } from "react";

export const FileSorterContext = createContext();

const FileSorterContextProvider = (props) => {

    const [onTypeMode, setOnTypeMode] = useState(false);
    const [isHoverIcon, setIsHoverIcon] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [listification, setListification] = useState(false);
    const [inputText, setInputText] = useState("");
    const [uploadFiles, setUploadFiles] = useState([]);
    const [processedData, setProcessedData] = useState([]);

    const contextValue = {
        onTypeMode, setOnTypeMode,
        isHoverIcon, setIsHoverIcon,
        isSorting, setIsSorting,
        listification, setListification,
        inputText, setInputText,
        uploadFiles, setUploadFiles,
        processedData, setProcessedData
    }

    return (
        <FileSorterContext.Provider value={contextValue}>
            {props.children}
        </FileSorterContext.Provider>
    );
}

export default FileSorterContextProvider;