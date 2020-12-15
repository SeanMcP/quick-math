import { decode } from "./code.js";

// ?o=a&n=1&n=2&t=5&s=3&a=g&p=99-97-116&f=100-111-103
export function get() {
  const usp = new URLSearchParams(location.search);
  const numbers = usp.getAll("n").map(Number);
  const operations = usp.getAll("o");

  return {
    edit: usp.get("edit") === "true",
    failKey: decode(usp.get("f")),
    graded: usp.get("e") === "g",
    numbers,
    operations,
    passKey: decode(usp.get("p")),
    satisfactory: Number(usp.get("s")),
    total: Number(usp.get("t")),
  };
}
