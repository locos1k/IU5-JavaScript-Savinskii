const readline = require("readline");

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// -----------------------------
// Задание 2.10
// Подсчёт слов-префиксов
// -----------------------------

function countOrbitRequestPrefixes(orbitWordsCollection, orbitRequestString) {
    let orbitPrefixCount = 0;

    orbitWordsCollection.forEach((orbitWord) => {
        if (orbitRequestString.startsWith(orbitWord)) {
            orbitPrefixCount += 1;
        }
    });

    return orbitPrefixCount;
}

// -----------------------------
// Задание 3.4
// Сортировка букв в словах
// и сортировка слов в предложении
// -----------------------------

function formatOrbitSentence(orbitSentenceString) {
    let normalizedOrbitSentence = orbitSentenceString.trim();

    // Цикл с постусловием:
    // выполняется, пока в строке есть двойные пробелы
    do {
        normalizedOrbitSentence = normalizedOrbitSentence.replaceAll("  ", " ");
    } while (normalizedOrbitSentence.includes("  "));

    const orbitWordsArray = normalizedOrbitSentence.split(" ");

    const sortedOrbitWordsArray = orbitWordsArray.map((orbitWord) => {
        const lowerOrbitWord = orbitWord.toLowerCase();
        const sortedLetters = lowerOrbitWord.split("").sort().join("");

        return sortedLetters;
    });

    sortedOrbitWordsArray.sort();

    const formattedOrbitWordsArray = sortedOrbitWordsArray.map((orbitWord) => {
        return orbitWord.charAt(0).toUpperCase() + orbitWord.slice(1).toLowerCase();
    });

    return formattedOrbitWordsArray.join(" ");
}

// -----------------------------
// Меню приложения
// -----------------------------

function showMenu() {
    console.log("\n=== Домашнее задание: работа с коллекциями ===");
    console.log("1. Задание 2.10 — посчитать слова-префиксы");
    console.log("2. Задание 3.4 — отсортировать буквы в словах и сами слова");
    console.log("0. Выход\n");

    terminal.question("Выберите пункт меню: ", (answer) => {
        if (answer === "1") {
            runPrefixTask();
        } else if (answer === "2") {
            runSortTask();
        } else if (answer === "0") {
            console.log("Программа завершена.");
            terminal.close();
        } else {
            console.log("Некорректный пункт меню.");
            showMenu();
        }
    });
}

// -----------------------------
// Запуск задания 2.10
// -----------------------------

function runPrefixTask() {
    terminal.question("Введите слова через пробел: ", (wordsInput) => {
        terminal.question("Введите строку для проверки: ", (orbitRequestString) => {
            const orbitWordsCollection = wordsInput
                .trim()
                .toLowerCase()
                .split(" ");

            const orbitRequest = orbitRequestString
                .trim()
                .toLowerCase();

            const result = countOrbitRequestPrefixes(
                orbitWordsCollection,
                orbitRequest
            );

            console.log(`\nКоличество слов-префиксов: ${result}`);

            showMenu();
        });
    });
}

// -----------------------------
// Запуск задания 3.4
// -----------------------------

function runSortTask() {
    terminal.question("Введите предложение: ", (orbitSentenceString) => {
        const result = formatOrbitSentence(orbitSentenceString);

        console.log(`\nРезультат сортировки: ${result}`);

        showMenu();
    });
}

// запуск программы
showMenu();