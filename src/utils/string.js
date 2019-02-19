const from = 'áéíóúÁÉÍÓÚ';
const to = 'aeiouAEIOU';

export function normalize(str) {
  let result = str;

  from.split('').map((letter, letterIndex) => {
    const regExp = new RegExp(letter, 'gi');
    result = result.replace(regExp, to.charAt(letterIndex));
  });

  return result.trim().toLowerCase();
}
