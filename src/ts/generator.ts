console.log("generator.ts -> OK");

async function generatePseudo(
    useNumbers: boolean = false,
    numbersRange: number = 0,
    useSymbols: boolean = false,
    words: string[] = []
): Promise<string> {
    const numbers = '0123456789';
    const symbols = '!@#$%&*_+-=.?';

    // TODO emoji pack
    const emoji: string[] = [""];

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
}

async function generatePseudos(
    useNumbers: boolean,
    numbersRange: number,
    useSymbols: boolean,
    count: number
): Promise<string[]> {
    const wordsFile = await fetch('https://kerogs.github.io/username-generator/words.txt');
    const wordsText = await wordsFile.text();
    const words = wordsText.split('\n').filter(line => line.trim() !== '');

    const pseudos: string[] = [];
    for (let i = 0; i < count; i++) {
        pseudos.push(await generatePseudo(useNumbers, numbersRange, useSymbols, words));
    }
    
    return pseudos;
}

// Example of usage
// async function main() {
//     const pseudos = await generatePseudos(useNumbers, numbersRange, useSymbols, 5);
//     console.log(JSON.stringify(pseudos));
// }