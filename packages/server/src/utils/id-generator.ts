// @ts-ignore
import Fakerator from 'fakerator';
//@ts-ignore
import randomDate from 'random-date-generator';
import {performChecksum} from './checksum';

const fakerator = Fakerator();
export const getFirstFourDigits = (birthDate: Date): string => {
  const serialBirthDate = birthDate
    .toISOString()
    .split('T')[0]
    .slice(2)
    .replace(/-/g, '');
  return serialBirthDate;
};

const generateSecondFourDigits = (gender = 'm'): string => {
  let i = -1;
  let fourDigits = '';
  while (++i < 3) {
    const randNum =
      gender.toLowerCase() === 'f'
        ? fakerator.random.number(0, 4999)
        : fakerator.random.number(5000, 9999);
    const isCorrectLength = true;
    switch (isCorrectLength) {
      case randNum > 9 && randNum <= 99:
        i = i + 1;
        break;
      case randNum > 99 && randNum <= 999:
        i = i + 2;
        break;
      default:
        i = i + 3;
        break;
    }

    fourDigits += randNum.toString();
  }
  return fourDigits;
};

const isPermanentCitizen = () => fakerator.random.number(0, 1).toString();

export const generateIdNumber = (birthDate: Date): string => {
  const firstPart = getFirstFourDigits(birthDate);
  const secondPart = generateSecondFourDigits();
  const isCitizen = isPermanentCitizen();
  const race = fakerator.random.number(0, 7).toString();
  let partialIdNumber = `${firstPart}${secondPart}${isCitizen}${race}`;
  const checksumResults = performChecksum(partialIdNumber);
  if (checksumResults.isValid) {
    console.log('Congrats: ', checksumResults.idNumber);
  } else {
    console.log('MEH: ', checksumResults.idNumber);
  }
  return checksumResults.idNumber;
};
