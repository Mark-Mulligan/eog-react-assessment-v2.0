export const convertCamelCase = (inputString) => {
  let letters = inputString.split('');
  let result = [];

  letters.forEach((letter, index) => {
    if (index === 0) {
      result.push(letter.toUpperCase())
    } else if (letter === letter.toLowerCase()) {
      result.push(letter);
    } else if (letter === letter.toUpperCase()) {
      result.push(' ');
      result.push(letter);
    }
  });
  
  return result.join('');
}