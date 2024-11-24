// This function is here to select a random word
export const pickRandomWord = (words: string[]): string => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

// This function is to scramble the word
export const scrambleWord = (word: string): string => {
  return word
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')
    .toLocaleLowerCase();
};

export const getDailyWord = (
  words: string[]
): { word: string; gameStatus: boolean } => {
  const today = new Date().toISOString().split('T')[0];
  const storedDate = localStorage.getItem('dailyWordDate');
  const storedWord = localStorage.getItem('dailyWord');

  if (storedDate === today && storedWord) {
    return { word: storedWord, gameStatus: false };
  }

  const filteredWords = words.filter(
    (word) => /^[a-zA-Z]+$/.test(word) && word.length >= 4 && word.length <= 7
  );
  const dailyWord = pickRandomWord(filteredWords);

  localStorage.setItem('dailyWord', dailyWord);
  localStorage.setItem('dailyWordDate', today);
  return { word: dailyWord, gameStatus: true };
};

export const validateGuess = (guess: string, correctWord: string): boolean => {
  return guess.toLocaleLowerCase() === correctWord.toLocaleLowerCase();
};
