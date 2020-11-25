import { get, KEY } from "./storage.js";

(function main() {
  // Code
  const correct = get(KEY.count);
  const satisfactory = get(KEY.satisfactory);
  document.getElementById("key").textContent =
    correct >= satisfactory ? get(KEY.pass) : get(KEY.fail);
})();
