<?php

// ! deprecated

function generatePseudo($useNumbers = false, $numbersRange=0, $useSymbols = false) {
    $numbers = '0123456789';
    $symbols = '!@#$%&*_+-=.?';
    
    
    // TODO emoji pack
    $emoji = [""];

    $words = file('../words.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    $pseudo = '';

    if($useSymbols) {
        if(rand(2, 3) == 3){
            $pseudo .= $symbols[rand(0, strlen($symbols) - 1)];
        }
    }
    $length = rand(1,2); 
    for ($i = 0; $i < $length; $i++) {
        $pseudo .= ucfirst($words[rand(0, count($words) - 1)]);
    }

    if($useNumbers) {
        for($i = 0; $i < $numbersRange; $i++) {
            $pseudo .= $numbers[rand(0, $numbersRange)];
        }
    }

    if($useSymbols) {
        if(rand(0, 1) == 1){
            $pseudo .= $symbols[rand(0, strlen($symbols) - 1)];
        }
    }

    return $pseudo;
}

if(isset($_POST['number'])) {
    $useNumbers = true;
    $numbersRange = $_POST['numberRange'];
} else {
    $useNumbers = false;
}

if(isset($_POST['ssymbols'])) {
    $useSymbols = true;
} else {
    $useSymbols = false;
}

$pseudos = [];
for ($i = 0; $i < 5; $i++) {
    $pseudos[] = generatePseudo($useNumbers, $numbersRange, $useSymbols);
}

header('Content-Type: application/json');
echo json_encode($pseudos);
