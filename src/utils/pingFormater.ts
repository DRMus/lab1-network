import { FormFields } from "../App";

export const pingFormater = (data: FormFields) => {
  let request = data.rules;

  Object.keys(data).map((key) => {
    if (!data[key] || key === "rules") return;

    if (key === "link") {
      request = `${request} ${data[key]}`;
      return;
    }

    if (typeof data[key] === "string" || typeof data[key] === "number") {
      request = `${request} ${key} ${data[key]}`;
    } else {
      request = `${request} ${key}`;
    }
  });

  return request;
};
