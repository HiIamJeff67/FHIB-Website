const _SPOTIFY_SIGN = "_-_";
const _SPOTIFY_SIGN_LENGTH = 3;
const _MP3_STRING_LENGTH = 4; // .mp3


const stringArrayToValueArray = function(stringArray) {
    let values = [], len = stringArray.length;
    let smallestLen = stringArray[0].length;
    for (let i = 1; i < len; i++) {
        smallestLen = Math.min(smallestLen, stringArray[i].length);
    }

    for (let i = 0; i < len; i++) {
        let totVal = 0;
        const currentString = stringArray[i].toLowerCase();
        for (let j = 0; j < smallestLen; j++) { // 'a' = 97
            let letterVal = currentString.charCodeAt(j) - 'a'.charCodeAt(0);
            totVal += letterVal * Math.pow(100, smallestLen - 1 - j);
        }
        values.push(totVal);
    }
    
    return values;
}

const quickSort = function(values, stringArray) {
    let left = 0, right = values.length;
    while (left < right) {
        for (let i = left; i < right; i++) {
            if (values[i] > values[i + 1]) {
                let tempVal = values[i];
                values[i] = values[i + 1];
                values[i + 1] = tempVal;

                let tempString = stringArray[i];
                stringArray[i] = stringArray[i + 1];
                stringArray[i + 1] = tempString;
            }
        }right--;
        for (let j = right; j > left; j--) {
            if (values[j - 1] > values[j]) {
                let tempVal = values[j];
                values[j] = values[j - 1];
                values[j - 1] = tempVal;

                let tempString = stringArray[j];
                stringArray[j] = stringArray[j - 1];
                stringArray[j - 1] = tempString;
            }
        }left++;
    }
    return stringArray;
}

export const isEnglishOrNumber = function(character) {
    const chineseRegex = /[\u4e00-\u9fa5]/;
    const englishRegex = /[a-zA-Z]/;
    const numberRegex = /\d/;
    if (chineseRegex.test(character)) {
      console.log("Detect that this files contain chinese!");
    }
    return englishRegex.test(character) || numberRegex.test(character);
}

const findFirstDotIndex = function(string) {
  for (let i = 0; i < string.length; i++) {
    if (string[i] === ".") return i;
  }
  return -1;
}

// if true => the whole thing in files must be listed
export const isFilesOrContextsListed = function(data) {
  let filesName = [];
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === "object") filesName[i] = data[i].name;
    else filesName[i] = data[i];
  }

  let countListedFiles = 0;
  for (let i = 0; i < filesName.length; i++) {
    const currentFileDotIndex = findFirstDotIndex(filesName[i]);
    if (currentFileDotIndex === -1) return false;
    const number = filesName[i].substring(0, currentFileDotIndex);
    if (!/\d/.test(number) 
      || filesName[i].substring(currentFileDotIndex, currentFileDotIndex + 2) !== ". ") {
        return false;
    }
    countListedFiles += 1;
  }
  return (countListedFiles === filesName.length);
}

export const eliminateContextListSign = function(context) {
  let contexts = [];
  if (typeof context === "string") contexts = context.split('\n');
  else  contexts = context;
		
  let newContexts = [], newPtr = 0;
	for (let i = 0; i < contexts.length; i++) {
		// 1. name
		if (contexts[i] !== undefined && contexts[i].length !== 0) {
      let currentContextDotIndex = findFirstDotIndex(contexts[i]);
      if (contexts[i][currentContextDotIndex + 1] === " ") currentContextDotIndex++;
			newContexts[newPtr++] = contexts[i].substring(currentContextDotIndex + 1);
		}
	}
  return newContexts;
}

export const getContextListSign = function(context) {
  let contexts = [];
  if (typeof context === "string") contexts = context.split('\n');
  else  contexts = context;

  let newContexts = [];
  for (let i = 0; i < contexts.length; i++) {
    newContexts[i] = `${i + 1}. ${contexts[i]}`;
  }
  return newContexts;
}

// function to sort the fileName in alphabetical order
export const sortFileInAlphabeticalOrder = function(files) {  // String[] files;
    // make sure that there is no "." character in the String(bcs we will delete all the character after it)
    let listFlag = false;
    if (isFilesOrContextsListed(files)) {
      eliminateContextListSign(files);
      listFlag = true;
    }
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
    if (listFlag) {
      processedFiles = getContextListSign(processedFiles);
    }

    // sort the file with weight (len - position) * 100
    let values = stringArrayToValueArray(processedFiles);
    const sortedFile = quickSort(values, processedFiles);
    return sortedFile;
}

export const sortFileInAlphabeticalOrderInSpotifyMode = function(spotifyFiles) {
  let processedFiles = [];
  for (let i = 0; i < spotifyFiles.length; i++) {
    let processedFile = [];
    if (typeof spotifyFiles[i] === "object") {
      const spotifyFileName = spotifyFiles[i].name;
      for (let p = 0; p + _SPOTIFY_SIGN_LENGTH < spotifyFileName.length; p++) {
        if (spotifyFileName.substring(p, p + _SPOTIFY_SIGN_LENGTH) === _SPOTIFY_SIGN) {
          let currentPosition = p + _SPOTIFY_SIGN_LENGTH;
          processedFile.push(spotifyFileName.substring(currentPosition, spotifyFileName.length - _MP3_STRING_LENGTH));
        }
      }
      processedFiles.push(processedFile.join(''));
    } else {
      for (let p = 0; p + _SPOTIFY_SIGN_LENGTH < spotifyFiles[i].length; p++) {
        if (spotifyFiles[i].substring(p, p + _SPOTIFY_SIGN_LENGTH) === _SPOTIFY_SIGN) {
          let currentPosition = p + _SPOTIFY_SIGN_LENGTH;
          processedFile.push(spotifyFiles[i].substring(currentPosition, currentPosition + _MP3_STRING_LENGTH));
        }
      }
      processedFiles.push(processedFile.join(''));
    }
  }

  // sort the file with weight (len - position) * 100
  let values = stringArrayToValueArray(processedFiles);
  const sortedFile = quickSort(values, processedFiles);
  return sortedFile;
}