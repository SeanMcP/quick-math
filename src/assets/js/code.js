export function decode(encoded) {
  if (!encoded) return;
  return encoded
    .split("-")
    .map((code) => String.fromCharCode(code))
    .join("");
}

export function encode(string) {
  if (!string) return;
  return string
    .split("")
    .map((letter) => letter.charCodeAt(0))
    .join("-");
}
