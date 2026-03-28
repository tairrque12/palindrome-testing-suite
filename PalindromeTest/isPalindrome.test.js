// This is the file that checks whether the function works.

const isPalindrome = require("./isPalindrome");

//THE TEST: WHEN I GIVE YOU BOB DOES IT RETURN TRUE.
describe("isPalindrome", () => {
    test("returns true for bob", () => {
        expect(isPalindrome("bob")).toBe(true);
    });

    //RACECAR SHOULD BE TRUE
    test("returns true for racecar", () =>{
        expect(isPalindrome("racecar")).toBe(true);
        });

    //RACECAR SHOULD BE FALSE
    test("returns false for apple", () =>{
        expect(isPalindrome("apple")).toBe(false);
        });

    //NUMBERS SHOULD BE FALSE
    test("returns false for a number", () =>{
        expect(isPalindrome(12345)).toBe(false)
        });

    //NULLS SHOULD BE FALSE
    test("returns false for null", () =>{
        expect(isPalindrome(null)).toBe(false)
        });

    //UNDEFINED SHOULD BE FALSE
    test("returns false for undefined", () =>{
        expect(isPalindrome(undefined)).toBe(false)
        });

    //ALL ARRAYS SHOULD BE FALSE
    test("returns false for an array", () =>{
        expect(isPalindrome(["racecar"])).toBe(false)
        });

    //IGNORES UPPERCASE AND LOWERCASE: Racecar should still be true. BOB should still be true/
    test("returns true for Racecar with uppercase letters", () =>{
        expect(isPalindrome("Racecar")).toBe(true);
        });

    //BOB should still be true
    test("returns true for Bob", () =>{
        expect(isPalindrome("Bob")).toBe(true);
        });

    //OUTLIER HANDLER
    test("returns true for Madam I'm Adam", () => {
        expect(isPalindrome("Madam I'm Adam")).toBe(true);
        });

    test("returns true for Red rum, sir, is murder", () =>{
        expect(isPalindrome("Red rum, sir, is murder")).toBe(true);
        });



});