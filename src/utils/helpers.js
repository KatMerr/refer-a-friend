import { useEffect, useRef } from 'react'
import { BadWords } from './bad-words'

//Will search the list of bad words (explicits) and return whether or not its banned
export const isBadWord = (word) => {
    const bad = BadWords;
    return binaryArraySearch(bad, word);
};

//A binary search for an alphabetized array
export const binaryArraySearch = (array, find) => {
    let arrayLength = array.length || 0;
    const searchValue = find.replace(/-/g, "").toLowerCase();
    if (arrayLength){
        let halfIndex= Math.floor(arrayLength / 2);
        let halfValue = array[halfIndex];
        while(true){
            //The list being worked with spaces out some words with - for no reason, remove those here
            halfValue = array[halfIndex].replace(/-/g, "").toLowerCase();
            if (arrayLength === 1){
                if (halfValue === searchValue){
                    return true;
                } else {
                    return false;
                }
            }
            if (halfValue === searchValue){
                return true;
            } else if (halfValue > searchValue){
                arrayLength = Math.floor(arrayLength / 2);
                halfIndex = Math.floor(halfIndex - (Math.ceil(arrayLength/2)));
            } else if (halfValue < searchValue){
                arrayLength = Math.ceil(arrayLength / 2);
                halfIndex = Math.floor(halfIndex + (Math.floor(arrayLength/2)));
            }
        }
    } else {
        return false;
    }
}

//Custom hook made to work with set interval and update state after each callback
//Based off of this article: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback, delay) => {
    const savedCallBack = useRef();

    useEffect(() => {
        savedCallBack.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick(){
            savedCallBack.current();
        }
        if (delay !== null){
            let interval = setInterval(tick, delay);
            return () => clearInterval(interval);
        }
    }, [delay]);
}

//Convers an enum object to an array of objects with the values name and value
//Used to convert the const Enums to options in buttons or dropdowns. 
//The key must be snake case, as the _ get removed to create the name/display of the option
//The value will become the value of the option
export const enumToArray = (obj) => {
    let arr = [];
    for (let key in obj){
        arr.push({
            name: key.replace(/_/, " "),
            value: obj[key]
        });
    }
    return arr;
}

//Checks to make sure the enteredURL is a similar URL to the expected URL in the format http://[URL]/[SOMETHING] 
// ExpectedURL: test.com | enteredURL: https://test.com/a1b2c3 | result: true
//ExpectedURL: foo.com | enteredURL: foo.com/abcde | result: false (no HTTP or HTTPS)
// ExpectedURL: bar.com | enteredURL: https://bar.com | result: false (no following slash)
export const doUrlsMatch = (expectedURL, enteredURL) => {
    const escapedExpectedURL = expectedURL.replace(".", "\\\.");
    const URLRegex = new RegExp(`^(http|https):\\\/\\\/${escapedExpectedURL}\\\/[\\\w\\\/]+$`);
    return URLRegex.test(enteredURL);
}