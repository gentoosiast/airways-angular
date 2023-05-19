const START_SEAT_NUMBER = 1;
const END_SEAT_NUMBER = 50;
const START_LETTER = 'A';
const END_LETTER = 'F';

export const generateRandomSeatLetter = (): string => {
  const startCharCode = START_LETTER.charCodeAt(0);
  const endCharCode = END_LETTER.charCodeAt(0);

  return String.fromCharCode(generateRandomNumber(startCharCode, endCharCode));
};

export const generateRandomSeatNumber = (): number => {
  return generateRandomNumber(START_SEAT_NUMBER, END_SEAT_NUMBER);
};

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
