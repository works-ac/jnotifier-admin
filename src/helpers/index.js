export function getInitials(name = "") {
  if (!name) return null;

  const firstWord = name.split(" ").at(0);
  const lastWord = name.split(" ").at(-1);

  return `${firstWord.at(0)}${lastWord.at(0)}`;
}

export function getToastNotification() {
  return { autoClose: 4000, theme: "dark" };
}

export function getErrorMsg(error) {
  const message =
    error?.response?.data?.msg ??
    error?.response?.data?.error?.message ??
    error?.message ??
    "Something went wrong while processing your request, please try again!!!";

  return message;
}

export function convertIntoMB(sizeInBytes) {
  if (!sizeInBytes) return 0;

  return (sizeInBytes / (1024 * 1024)).toFixed(2);
}
