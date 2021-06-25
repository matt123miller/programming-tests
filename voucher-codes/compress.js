
/**
 * Given a string input compress it so that it's shorter than the input.
 * The compression is based on how many of each character is in sequence.
 * If the compressed string is the same length or longer than the input
 * then return the input instead, that's not actually compressed.
 * 
 * @warn It does handle strings containing negative numbers
 * @example
 * ```
 * compressString('aabcccca') == '2a1b4c1a'
 * compressString('hello') == 'hello' 
 * // The compressed string would be '1h1e2l1o' which is longer than 'hello'
 * compressString('1117777') == '3147'
 * // a string of numbers is still a string
 * ```
 * @param {String} input
 * @returns {String}
 * */
function compressString(input) {

    if (input.length <= 2) {
        // Inputs this short cannot possibly be compressed with this algorithm
        return input;
    }

    let prev = input[0];
    let consecutiveChars = 0;
    let compressedStr = '';
    let nextChunk = '';
    // failing: 333389999 == 431849

    //strings are iterable, but I want the i as it'll likely be useful.
    Array.from(input).forEach((char, i) => {

        if (prev === char) {
            consecutiveChars++;
            nextChunk = `${consecutiveChars}${prev}`;
        }
        // if it's a different character then we need to do something else
        else {
            // save the chunk we've been building
            compressedStr += nextChunk
            // reset the counter
            consecutiveChars = 1;
            // we still need to create a chunk though
            nextChunk = `${1}${char}`;
        }

        prev = char;
    })

    // the last chunk also needs recording.
    // Better than making the loop more complex
    compressedStr += nextChunk;

    if (compressedStr.length >= input.length) {
        return input;
    }

    return compressedStr;

}

module.exports = compressString;