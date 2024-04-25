export const megaBytesConverter = (value, option) => {
  if (option == "floor") return Math.floor(value / (1024 * 1024));
  else if (option == "ceil") return Math.ceil(value / (1024 * 1024));
  else if (option == "GB") return Math.ceil(value / (1024 * 1024 * 1024)).toFixed(2);
  else return value / (1024 * 1024);
};

export function timeConverter(value = "", format) {
  let date = value.slice(0, 10);
  if (format == "date") return date;

  let result = "";
  let time = value.slice(11);

  let hour = Number(time.slice(0, 2));
  let minute = time.slice(2, 5);

  switch (true) {
    case hour == 0:
      result = "12" + minute + " AM";
      break;

    case hour < 12:
      result = hour + minute + " AM";
      break;

    case hour == 12:
      result = 12 + minute + " PM";
      break;

    case hour > 12:
      result = hour - 12 + minute + " PM";
      break;

    default:
      result = "";
  }

  if (format == "time") {
    return result;
  } else return date + "/" + result;
}
