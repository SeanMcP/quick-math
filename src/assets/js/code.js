export function decode(encoded) {
  return encoded
    .split("-")
    .map((code) => String.fromCharCode(code))
    .join("");
}

export function encode(string) {
  return string
    .split("")
    .map((letter) => letter.charCodeAt(0))
    .join("-");
}
