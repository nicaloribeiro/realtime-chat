export const generateRandomColors = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const hexColor = "#" + randomColor.padStart(6, "0");
    console.log(hexColor)
  return hexColor;
};
