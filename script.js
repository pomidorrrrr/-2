const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const methodSelect = document.getElementById('cipherMethod');
const shiftInput = document.getElementById('shift');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');

function caesarCipher(text, shift, decrypt = false) {
    if (decrypt) shift = -shift;
    let result = '';
    for (let char of text) {
        if (char.match(/[а-яА-Я]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'А'.charCodeAt(0) : 'а'.charCodeAt(0);
            const index = char.charCodeAt(0) - base;
            const shiftedIndex = (index + shift + 33) % 33;
            result += String.fromCharCode(base + shiftedIndex);
        } else if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const index = char.charCodeAt(0) - base;
            const shiftedIndex = (index + shift + 26) % 26;
            result += String.fromCharCode(base + shiftedIndex);
        } else {
            result += char;
        }
    }
    return result;
}

function atbashCipher(text) {
    let result = '';
    for (let char of text) {
        if (char.match(/[а-я]/)) {
            const index = 32 - (char.charCodeAt(0) - 'а'.charCodeAt(0));
            result += String.fromCharCode('а'.charCodeAt(0) + index);
        } else if (char.match(/[А-Я]/)) {
            const index = 32 - (char.charCodeAt(0) - 'А'.charCodeAt(0));
            result += String.fromCharCode('А'.charCodeAt(0) + index);
        } else if (char.match(/[a-z]/)) {
            const index = 25 - (char.charCodeAt(0) - 'a'.charCodeAt(0));
            result += String.fromCharCode('a'.charCodeAt(0) + index);
        } else if (char.match(/[A-Z]/)) {
            const index = 25 - (char.charCodeAt(0) - 'A'.charCodeAt(0));
            result += String.fromCharCode('A'.charCodeAt(0) + index);
        } else {
            result += char;
        }
    }
    return result;
}

encryptBtn.addEventListener('click', () => {
    const text = inputText.value;
    const method = methodSelect.value;
    const shift = parseInt(shiftInput.value) || 3;
    let result = '';
    if (method === 'caesar') result = caesarCipher(text, shift);
    else if (method === 'atbash') result = atbashCipher(text);
    outputText.value = result;
});

decryptBtn.addEventListener('click', () => {
    const text = inputText.value;
    const method = methodSelect.value;
    const shift = parseInt(shiftInput.value) || 3;
    let result = '';
    if (method === 'caesar') result = caesarCipher(text, shift, true);
    else if (method === 'atbash') result = atbashCipher(text);
    outputText.value = result;
});