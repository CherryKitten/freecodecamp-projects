function telephoneCheck(str) {
    const regex = /((^((\(\d{3}\))|(\d{3})))(\s?-?(\d{3}))(\s?-?\d{4})$)|(^1(((\s|-)\d{3})|(\s?-?\(\d{3}\)))(\s?-?\d{3}\s?-?\d{4}))/
    return regex.test(str);
}


// All of those should be true:
let testsTrue = [
    telephoneCheck("555-555-5555"),
    telephoneCheck("(555)555-5555"),
    telephoneCheck("(555) 555-5555"),
    telephoneCheck("555 555 5555"),
    telephoneCheck("5555555555"),
    telephoneCheck("1 555 555 5555"),
    telephoneCheck("1 (555) 555-5555")
    ]

// All of those should be false:
let testsFalse = [
    telephoneCheck("(555-555-5555"),
    telephoneCheck("(555)5(55?)-5555"),
    telephoneCheck("11 555-555-5555"),
    telephoneCheck("10 (757) 622-7382"),
    telephoneCheck("5555555"),
    telephoneCheck("555-5555"),
    telephoneCheck("55555555"),
    telephoneCheck("27576227382")
]

console.log("True: " + testsTrue);
console.log("False: " + testsFalse);
console.log("bla")