function isPalindrome(input) {
    if (typeof input !== "string") {
        return false;
    }

    //FIND WHATEVER IS NOT A LOWERCASE LETTER OR A NUMBER AND REPLACE IT WITH NOTHING
    const cleanedInput = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    const letters = cleanedInput.split("")
    const backwardsLetters = letters.reverse();
    const reversedWord = backwardsLetters.join("");

    return cleanedInput ===reversedWord;
}

module.exports = isPalindrome;