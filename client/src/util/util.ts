export const cardText = (text: string) => {
  return text.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};
