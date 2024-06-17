const _SPOTIFY_SIGN = "_-_";
const _SPOTIFY_SIGN_LENGTH = 3;
const _MP3_STRING_LENGTH = 4; // .mp3

const getShortestStringLength = function(stringArray) {
  let minLen = stringArray[0].length;
  for (const string of stringArray) {
    minLen = Math.min(minLen, string.length);
  }
  return minLen;
}
const getLongestStringLength = function(stringArray) {
  // number: 10^-324 ~ 10^308 => so we take 150 as safty, bcs we will do 100^maxLen(=10^(2*maxLen)) later
  let limitLen = 150, maxLen = stringArray[0].length;
  for (const string of stringArray) {
    maxLen = Math.min(limitLen, Math.max(maxLen, string.length));
  }
  return maxLen;
}
// const adjustStringArrayToSameLength = function(stringArray) {
//   let newStrings = [], maxLen = getLongestStringLength(stringArray);
//   for (const string of stringArray) {
//     if (string.length < maxLen) {
//       string += "0".repeat(maxLen - string.length);
//     }
//     newStrings.push(string);
//   }
//   return newStrings;
// }
// const adjustStringArrayToSameLength = function(stringArray) {
//   let newStrings = [], minLen = getShortestStringLength(stringArray);
//   for (const string of stringArray) {
//     newStrings.push(string.substr(0, minLen));
//   }
//   return newStrings;
// }
// const findMaxElement = function(array) {
//   if (array.length === 0) return 0;
//   let maximum = array[0];
//   for (const element of array) {
//     maximum = Math.max(maximum, element);
//   }
//   return maximum;
// }
// const findMaxDigits = function(array, radix) {
//   let maxElement = findMaxElement(array), digits = 0;
//   while (maxElement > 0) {
//     maxElement /= radix;
//     digits++;
//   }
//   return digits;
// }

// const countingSort = function(stringArray, indexArray, curDigits, radix) {
//   const len = stringArray.length;
//   let count = [];
//   let newArray = [], newIndexArray = [];
//   for (let i = 0; i < radix; i++) {
//     count[i] = 0;
//   }
//   for (let i = 0; i < len; i++) {
//     count[stringArray[i][curDigits]]++;
//   }
//   for (let i = 1; i < radix; i++) {
//     count[i] += count[i - 1];
//   }
//   for (let i = len - 1; i >= 0; i--) {
//     newArray[count[stringArray[i][curDigits]]] = stringArray[i];
//     newIndexArray[count[stringArray[i][curDigits]]] = indexArray[i];
//     count[stringArray[i][curDigits]]--;
//   }
//   return [newArray, newIndexArray];
// }
// const radixSort = function(stringArray, radix) {
//   const len = stringArray.length;
//   const maxDigits = findMaxDigits(stringArray, radix);
//   let newIndexArray = [];
//   for (let i = 0; i < len; i++) newIndexArray[i]= i;
//   const sortedStringArray = adjustStringArrayToSameLength(stringArray);
//   for (let curDigits = 0; curDigits < maxDigits; curDigits++) {
//     [sortedStringArray, newIndexArray] = countingSort(sortedStringArray, (maxDigits - curDigits - 1), radix);
//   }

//   let newStringArray = [];
//   for (let i = 0; i < len; i++) {
//     newStringArray[i] = stringArray[newIndexArray[i]];
//   }
//   return newStringArray;
// }

const stringArrayToValueArray = function(stringArray) {
    let values = [], len = stringArray.length;
    let maxLen = getLongestStringLength(stringArray);

    for (let i = 0; i < len; i++) {
      let totVal = 0;
      const currentString = stringArray[i].toLowerCase();
      // console.log(currentString)
      for (let j = 0; j < maxLen; j++) { // 逐步為currentString的字母取值
        // currerntString.charCodeAt(j) may be NaN
        if (currentString.length < j || !currentString.charCodeAt(j)) {
          continue;
        } else {
          let letterVal = currentString.charCodeAt(j) - 0;
          // console.log("letterVal:", letterVal);
          totVal += letterVal * Math.pow(100, maxLen - 1 - j);
        }
      }
      values.push(totVal);
    }
    
    return values;
}

// const boubleSort = function(values, stringArray) {
//   let left = 0, right = values.length;
//   while (left < right) {
//       for (let i = left; i < right; i++) {
//           if (values[i] > values[i + 1]) {
//               // [values[i], values[i + 1]] = [values[i + 1], values[i]];
//               let tempVal = values[i];
//               values[i] = values[i + 1];
//               values[i + 1] = tempVal;

//               // [stringArray[i], stringArray[i + 1]] = [stringArray[i + 1], stringArray[i]];
//               let tempString = stringArray[i];
//               stringArray[i] = stringArray[i + 1];
//               stringArray[i + 1] = tempString;
//           }
//       }right--;
//       for (let j = right; j > left; j--) {
//           if (values[j - 1] > values[j]) {
//               // [values[j], values[j - 1]] = [values[j - 1], values[j]];
//               let tempVal = values[j];
//               values[j] = values[j - 1];
//               values[j - 1] = tempVal;

//               // [stringArray[j], stringArray[j - 1]] = [stringArray[j - 1], stringArray[j]];
//               let tempString = stringArray[j];
//               stringArray[j] = stringArray[j - 1];
//               stringArray[j - 1] = tempString;
//           }
//       }left++;
//   }
//   return stringArray;
// }

const partition = function(values, stringArray, left, right) {
  const pivotVal = values[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (values[j] < pivotVal) {
      let tempString = stringArray[i];
      stringArray[i] = stringArray[j];
      stringArray[j] = tempString;
      let tempValue = values[i];
      values[i] = values[j];
      values[j] = tempValue;
      i++;
    }
  }
  let tempString = stringArray[i]; stringArray[i] = stringArray[right]; stringArray[right] = tempString;
  let tempValue = values[i]; values[i] = values[right]; values[right] = tempValue;
  return i;
}
const quickSort = function(values, stringArray, left, right) {
  if (left < right) {
    const pivot = partition(values, stringArray, left, right);
    quickSort(values, stringArray, left, pivot - 1);
    quickSort(values, stringArray, pivot + 1, right);
  }
  // the result(sorted array) is equal to stringArray
  return stringArray
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
  if (typeof data === "undefined") return false;
  const tempData = data;  // IDK, but the parameter(data) just be modify

  let filesName = [];
  if (typeof data === "string") filesName = tempData.split('\n');
  else data.forEach((d) => { filesName.push(d)} );

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
  if (typeof context == undefined) return context;

  let contexts = [];
  if (typeof context === "object") {
    context.forEach((data) => { contexts.push(data) });
  }
  else if (typeof context === "string") {
    contexts = context.split('\n');
  }
		
  let newContexts = [], newPtr = 0;
	for (let i = 0; i < contexts.length; i++) {
		if (contexts[i] !== undefined && contexts[i].length !== 0) {
      let currentContextDotIndex = findFirstDotIndex(contexts[i]);
      if (contexts[i][currentContextDotIndex + 1] === " ") currentContextDotIndex++;
			newContexts[newPtr++] = contexts[i].substring(currentContextDotIndex + 1);
		}
	}
  return newContexts;
}
export const getContextListSign = function(context) {
  if (typeof context === "undefined") return context;

  let contexts = [];
  if (typeof context === "object") {
    context.forEach((data) => { contexts.push(data); });
  }
  if (typeof context === "string") {
    contexts = context.split('\n');
  }

  let newContexts = [], countErrorDetecter = 0;
  for (let i = 0; i < contexts.length; i++) {
    if (context[i] == i + 1) countErrorDetecter++;
    newContexts[i] = `${i + 1}. ${contexts[i]}`;
  }
  return (countErrorDetecter == context.length) ? context : newContexts;
}

// function to sort the fileName in alphabetical order
export const sortFileInAlphabeticalOrder = function(files) {  // String[] files;
    // make sure that there is no "." character in the String(bcs we will delete all the characters after it)
    let listFlag = false;
    if (isFilesOrContextsListed(files)) {
      files = eliminateContextListSign(files);
      listFlag = true;
    }
    let curProcessedFiles = [];
    for (let i = 0; i < files.length; i++) {
      let curProcessedFile = [];
      if (typeof files[i] === "object") {
        for (const character of files[i].name) {
          if (character === '.') break;
          if (!isEnglishOrNumber(character)) continue;

          curProcessedFile.push(character);
        }
        curProcessedFiles.push(curProcessedFile.join(''));
      } else {
        for (const character of files[i]) {
          if (character === '.') break;
          if (!isEnglishOrNumber(character)) continue;
          
          curProcessedFile.push(character);
        }
        curProcessedFiles.push(curProcessedFile.join(''));
      }
    }
    // if (listFlag) {
    //   curProcessedFiles = getContextListSign(curProcessedFiles);
    // }
    // sort the file with weight (len - position) * 100
    const values = stringArrayToValueArray(curProcessedFiles);
    // console.log(values)
    // const sortedFile = boubleSort(values, curProcessedFiles);
    quickSort(values, curProcessedFiles, 0, curProcessedFiles.length - 1);
    if (listFlag) { // relistitficate here
      curProcessedFiles = getContextListSign(curProcessedFiles);
    }
    
    return curProcessedFiles;
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
  const values = stringArrayToValueArray(processedFiles);
  // const sortedFile = boubleSort(values, processedFiles);
  // console.log(values)
  quickSort(values, processedFiles, 0, processedFiles.length - 1);
  return processedFiles;
}