function reverseString(str){
    return str.split("").reverse().join("")
}

function cleanUpString(str){
    return str.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase()
}
function palindrome(str) {
    str = cleanUpString(str);
    let checkstring = reverseString(str);
    return checkstring === (str);
}

let test1 = palindrome("eye"); //true
let test2 = palindrome("A man, a plan, a canal. Panama");//true
let test3 = palindrome("not a palindrome");//false
let test4 = palindrome("0_0 (: /-\ :) 0-0")//true
console.log(test1, test2, test3, test4)