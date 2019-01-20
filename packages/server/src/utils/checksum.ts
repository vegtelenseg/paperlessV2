export const getCheckDigit = (partialIdNumber: string): number => {
  console.log({partialIdNumber});
  if (parseInt(partialIdNumber)) {
    let i = -1;
    let partialIdNumberSum = 0;
    while (++i < partialIdNumber.length) {
      partialIdNumberSum += parseInt(partialIdNumber[i]);
    }
    return (partialIdNumberSum * 9) % 10;
  } else {
    console.log('Please pass a string of numbers');
    return 1;
  }
};

export const performChecksum = (
  partialIdNumber: string
): {isValid: boolean; idNumber: string} => {
  let tempIdNumber = partialIdNumber;
  let i = partialIdNumber.length - 1;
  while (i >= 0) {
    let doubled = parseInt(partialIdNumber[i]) * 2;
    if (doubled > 9) {
      doubled -= 9;
    }
    tempIdNumber = tempIdNumber.replace(
      tempIdNumber.charAt(i),
      doubled.toString()
    );
    i = i - 2;
  }
  const checkDigit = getCheckDigit(tempIdNumber);
  i = 0;
  let tempIdNumberSum = 0;
  const idNumber = partialIdNumber + checkDigit.toString();
  console.log('ID NUM: ', idNumber);
  while (i < idNumber.length) {
    tempIdNumberSum += parseInt(tempIdNumber[i++]);
  }
  if (tempIdNumberSum % 10 === 0) {
    return {
      isValid: true,
      idNumber,
    };
  }
  return {
    isValid: false,
    idNumber,
  };
};
