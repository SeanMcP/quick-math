import { decode } from "./code.js";

// ?t=10s=7&i=on&o=a&n=2&n3&p=116-101-115-116&f=116-101-115-116
export function get() {
  const usp = new URLSearchParams(location.search);
  const numbers = usp.getAll("n").map(Number);
  const operations = usp.getAll("o");

  return {
    allowIncorrect: usp.get("i") === "on",
    failKey: decode(usp.get("f")),
    numbers,
    operations,
    passKey: decode(usp.get("p")),
    satisfactory: Number(usp.get("s")),
    total: Number(usp.get("t")),
  };
}
