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

// function to sort the fileName in alphabetical order
export const sortFileInAlphabeticalOrder = function(files) {  // String[] files;
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