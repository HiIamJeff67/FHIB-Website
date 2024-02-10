export const stringArrayToValueArray = function(stringArray) {
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

export const quickSort = function(values, stringArray) {
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