var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("generator.ts -> OK");
function generatePseudo() {
    return __awaiter(this, arguments, void 0, function* (useNumbers = false, numbersRange = 0, useSymbols = false, words = []) {
        const numbers = '0123456789';
        const symbols = '!@#$%&*_+-=.?';
        // TODO emoji pack
        const emoji = [""];
        let pseudo = '';
        if (useSymbols) {
            if (Math.random() * 2 >= 1.5) {
                pseudo += symbols.charAt(Math.floor(Math.random() * symbols.length));
            }
        }
        const length = Math.floor(Math.random() * 2) + 1; // length will be either 1 or 2
        for (let i = 0; i < length; i++) {
            pseudo += words[Math.floor(Math.random() * words.length)].charAt(0).toUpperCase() +
                words[Math.floor(Math.random() * words.length)].slice(1);
        }
        if (useNumbers) {
            for (let i = 0; i < numbersRange; i++) {
                pseudo += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
        }
        if (useSymbols) {
            if (Math.random() >= 0.5) {
                pseudo += symbols.charAt(Math.floor(Math.random() * symbols.length));
            }
        }
        return pseudo;
    });
}
function generatePseudos(useNumbers, numbersRange, useSymbols, count) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordsFile = yield fetch('https://kerogs.github.io/username-generator/words.txt');
        const wordsText = yield wordsFile.text();
        const words = wordsText.split('\n').filter(line => line.trim() !== '');
        const pseudos = [];
        for (let i = 0; i < count; i++) {
            pseudos.push(yield generatePseudo(useNumbers, numbersRange, useSymbols, words));
        }
        return pseudos;
    });
}
// Example of usage
// async function main() {
//     const pseudos = await generatePseudos(useNumbers, numbersRange, useSymbols, 5);
//     console.log(JSON.stringify(pseudos));
// }
