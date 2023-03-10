import React, { useState } from "react";
import './style.css'

const words = [
  "apple",
  "banana",
  "orange",
  "grape",
  "lemon",
  "peach",
  "pear",
  "watermelon",
  "kiwi",
  "pineapple",
  "strawberry",
  "blueberry",
  "raspberry",
  "blackberry",
  "cherry",
  "mango",
  "pomegranate",
  "avocado",
  "coconut",
  "fig",
  "grapefruit",
  "guava",
  "lime",
  "papaya",
  "plum",
  "apricot",
  "cranberry",
  "dragonfruit",
  "gooseberry",
  "lychee",
  "nectarine",
  "passionfruit",
  "peanut",
  "almond",
  "cashew",
  "chestnut",
  "hazelnut",
  "walnut",
  "pecan",
  "pistachio",
  "macadamia",
  "sesame",
  "flaxseed",
  "quinoa",
  "amaranth",
  "bulgur",
  "couscous",
  "polenta",
  "oatmeal",
];

const Hangman = () => {
  const [word, setWord] = useState(randomWord());
  const [letters, setLetters] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);

  function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function handleGuess(letter) {
    setLetters(letters.add(letter));
    if (!word.includes(letter)) {
      setMistakes(mistakes + 1);
    }
  }

  function guessedWord() {
    return word
      .split("")
      .map((letter) => (letters.has(letter) ? letter : "_"))
      .join(" ");
  }

  function gameOver() {
    return mistakes >= 6 || guessedWord().indexOf("_") === -1;
  }

  function resetGame() {
    setWord(randomWord());
    setLetters(new Set());
    setMistakes(0);
  }

  return (
    <div>
      <h1>Hangman</h1>
      <p>Guess the word:</p>
      <p>{guessedWord()}</p>
      <p>Incorrect guesses: {mistakes}</p>
      {gameOver() && (
        <div>
          <p>{gameOver() && mistakes < 6 ? "You win!" : "You lose!"}</p>
          <button onClick={resetGame}>Play again</button>
        </div>
      )}
      {!gameOver() && (
        <div>
          <p>Choose a letter:</p>
          {Array.from(Array(26)).map((_, index) => {
            const letter = String.fromCharCode(index + 97);
            return (
              <button
                key={letter}
                disabled={letters.has(letter)}
                onClick={() => handleGuess(letter)}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Hangman;