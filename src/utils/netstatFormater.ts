import { FormFields } from "../App";

export const netstatFormater = (data: FormFields) => {
  let request = data.rules;

  Object.keys(data).map((key) => {
    if (!data[key] || key === "rules") return;

    if (typeof data[key] === "string" || typeof data[key] === "number") {
      request = `${request} ${key} ${data[key]}`;
    } else {
      request = `${request} ${key}`;
    }
  });

  request = `${request} ${data.interval || ""}`;

  return request;
};
