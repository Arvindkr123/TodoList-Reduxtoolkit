export const getClasses = (classes) => {
  // if it is empty then it will filter out
  return classes
    .filter((item) => item !== " ")
    .join(" ")
    .trim();
};
