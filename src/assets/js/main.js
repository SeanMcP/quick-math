import { encode } from "./code.js";

(function main() {
  // Code
  const createForm = document.getElementById("create-form");

  createForm.addEventListener("submit", () => {
    const dummyKeyInput = document.querySelector('input[data-name="key-dummy"]');
    if (dummyKeyInput.value) {
      document.querySelector('input[name="key"]').value = encode(dummyKeyInput.value);
    }
  });
})();
