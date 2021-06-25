const compress = require('./compress');

test('compressed strings that are longer than input should return input', () => {
    expect(compress('hello')).toBe('hello');
    expect(compress('hello')).not.toBe('1h1e2l1o');
    expect(compress('abcdefg')).toBe('abcdefg');
    expect(compress('1234')).toBe('1234');
});

test('short enough inputs should return that input', () => {
    // There's no way that we could compress strings of length 2
    // or less to be shorter, given the format of compression.
    expect(compress('')).toBe('');
    expect(compress('x')).toBe('x');
    expect(compress('j')).toBe('j');
    expect(compress('j')).not.toBe('1j');
    expect(compress('js')).toBe('js');
    expect(compress('js')).not.toBe('1j1s');
    expect(compress('qqqqq')).not.toBe('qqqqq');
    expect(compress('qqq')).not.toBe('qqq');
})

test('inputs with 1 type of character', () => {

    expect(compress('aaaaa')).toBe('5a');
    expect(compress('bbbbbb')).toBe('6b');
    expect(compress('yyy')).toBe('3y');
    // These are still strings after all
    expect(compress('777')).toBe('37');
})

test('inputs with 2 types of character', () => {
    expect(compress('aaccccc')).toBe('2a5c');
    expect(compress('aaaaacc')).toBe('5a2c');
    expect(compress('jjjjjsssss')).toBe('5j5s');
    expect(compress('jsssss')).toBe('1j5s');
    expect(compress('11113333')).toBe('4143');
})

test('inputs with 5 types of different character', () => {
    expect(compress('aaabbbcccdddeee')).toBe('3a3b3c3d3e');
    expect(compress('zzzyyyxxxwwwuuu')).toBe('3z3y3x3w3u');
})

test('inputs that end with 1 of a specific character', () => {
    expect(compress('aaaab')).toBe('4a1b');
    expect(compress('aaabcddddd')).toBe('3a1b1c5d');
    expect(compress('ttttyyyyu')).toBe('4t4y1u');
    expect(compress('ttttyyyy1')).toBe('4t4y11');
})

test('inputs made of punctuation', () => {
    expect(compress('!!!!!')).toBe('5!');
    expect(compress('!!!!!???')).toBe('5!3?');
    expect(compress('!!!!!???|')).toBe('5!3?1|');
})

test('inputs made of numbers', () => {
    expect(compress('333389999')).toBe('431849');
    expect(compress('7777777777')).toBe('107');

})

test('inputs with the same character in different positions', () => {
    expect(compress('aaaaabbaaa')).toBe('5a2b3a');
    expect(compress('aaaaabba')).toBe('5a2b1a');
    expect(compress('aaaa666baaa')).toBe('4a361b3a');
})

test('inputs made of a little bit of everything', () => {
    expect(compress('aaaaa7???##333333xx')).toBe('5a173?2#632x');
})

test('inputs with emojii, just in case', () => {
    expect(compress('😃😃😃😃😃😃')).toBe('6😃')
})