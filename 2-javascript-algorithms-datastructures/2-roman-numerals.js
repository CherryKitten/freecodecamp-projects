const romanNumerals = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
const arabicNumerals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
function convertToRoman(num) {
    const converted = [];
    for (let item in arabicNumerals){
        while (num >= arabicNumerals[item]){
            converted.push(romanNumerals[item]);
            num = num - arabicNumerals[item];
        }
    }
    return converted.join("")
}

let test1 = convertToRoman(36); //XXXVI
let test2 = convertToRoman(2014);//MMXIV
let test3 = convertToRoman(9);//IX
let test4 = convertToRoman(3999);//MMMCMXCIX