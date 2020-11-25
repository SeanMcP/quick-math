import { encode } from "./code.js";

(function main() {
  // Code
  const createForm = document.getElementById("create-form");

  createForm.addEventListener("submit", () => {
    const dummyPassKeyInput = document.querySelector('input[data-name="p-key-dummy"]');
    if (dummyPassKeyInput.value) {
      document.querySelector('input[name="p"]').value = encode(dummyPassKeyInput.value);
    }
    const dummyFailKeyInput = document.querySelector('input[data-name="f-key-dummy"]');
    if (dummyFailKeyInput.value) {
      document.querySelector('input[name="f"]').value = encode(dummyFailKeyInput.value);
    }
  });
})();
