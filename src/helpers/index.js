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

export function handleDownload(blob, fileName) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}

export function whatsAppFormatter(markdownText) {
  if (!markdownText) return "";

  return (
    markdownText
      // 1. Convert Headings (e.g., # Heading -> *Heading*)
      // WhatsApp doesn't support size changes, so making it bold is the best alternative
      .replace(/^#+\s*(.*)$/gm, "*$1*")

      // 2. Convert Bold (e.g., **text** -> *text*)
      .replace(/\*\*(.*?)\*\*/g, "*$1*")

      // 3. Convert Markdown Links (e.g., [Google](https://google.com) -> Google: https://google.com)
      // WhatsApp makes raw URLs clickable automatically
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2")

      // 4. Convert Strikethrough (e.g., ~~text~~ -> ~text~)
      .replace(/~~(.*?)~~/g, "~$1~")

      // 5. (Optional) Convert asterisks used for lists into dashes to prevent formatting issues
      .replace(/^\*\s+/gm, "- ")
  );
}

/**
 * Opens a WhatsApp share link in a new tab with the provided content.
 *
 * @param {string} content - The text message to be shared on WhatsApp.
 */
export function shareOnWhatsApp(content) {
  if (!content) return;

  const encodedContent = encodeURIComponent(content);
  const whatsappUrl = `https://wa.me/?text=${encodedContent}`;

  globalThis.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

/**
 * Masks an email address using a fixed number of masking characters.
 *
 * @param {string} email - The email address to mask.
 * @returns {string} The masked email address.
 */
export function maskEmail(email) {
  if (!email || !email.includes("@")) {
    return email;
  }

  const [localPart, domain] = email.split("@");
  const fixedMask = "****";
  let maskedLocalPart = "";

  // Validation 1: If local part is <= 4 characters, mask it entirely
  if (localPart.length <= 4) {
    maskedLocalPart = fixedMask;
  }
  // Rule 1: If > 4 characters, keep the first 4 visible and append fixed mask
  else {
    const visibleChars = localPart.substring(0, 4);
    maskedLocalPart = visibleChars + fixedMask;
  }

  // Rule 2: Domain and '@' remain visible
  return `${maskedLocalPart}@${domain}`;
}

export function showZodValidationError(fieldErr = {}) {
  console.error(fieldErr);
  const errObject = Object.entries(fieldErr).at(0);
  const message = errObject[1] ?? "Please fill up the form correctly.";
  return message;
}
