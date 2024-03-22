export const megaBytesConverter = (value, option) => {
  if (option == "floor") return Math.floor(value / (1024 * 1024));
  else if (option == "ceil") return Math.ceil(value / (1024 * 1024));
  else if (option == "GB") return Math.ceil(value / (1024 * 1024 * 1024)).toFixed(2);
  else return value / (1024 * 1024);
};
