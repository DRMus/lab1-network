import { FormFields } from "../App";

export const ipconfigFormater = (data: FormFields) => {
  return `${data.rules} ${data.param || ""} ${data.paramValue || ""}`;
};
