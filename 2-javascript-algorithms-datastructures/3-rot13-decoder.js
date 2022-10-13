function rot13(str) {
    for (let char = 0; char < str.length; char++){
        let code = str.charCodeAt(char);
        if (code >= 78 && code <= 90){
            str = str.substring(0, char) + String.fromCharCode(code - 13) + str.substring(char + 1);
        } else if (code >= 65 && code <= 77){
            str = str.substring(0, char) + String.fromCharCode(code + 13) + str.substring(char + 1);
        }
    } return str
}

let test = rot13("A B_C*D+EFGHIJKLMNOPQRSTUVWXYZ");
let test1 = rot13("SERR PBQR PNZC")//FREE CODE CAMP
let test2 = rot13("SERR CVMMN!")//FREE PIZZA!
let test3 = rot13("SERR YBIR?")//FREE LOVE?
let test4 = rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")//THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.