import { encode } from "./code.js";
import { get } from "./search-params.js";

(function main() {
  // Code
  const createForm = document.getElementById("create-form");

  createForm.addEventListener("submit", () => {
    const dummyPassKeyInput = document.querySelector(
      'input[data-name="p-key-dummy"]'
    );
    if (dummyPassKeyInput.value) {
      document.querySelector('input[name="p"]').value = encode(
        dummyPassKeyInput.value
      );
    }
    const dummyFailKeyInput = document.querySelector(
      'input[data-name="f-key-dummy"]'
    );
    if (dummyFailKeyInput.value) {
      document.querySelector('input[name="f"]').value = encode(
        dummyFailKeyInput.value
      );
    }
  });

  const params = get();
  if (params.edit) {
    params.numbers.forEach(
      (number) =>
        (document.querySelector(
          `input[name="n"][value="${number}"]`
        ).checked = true)
    );
    params.operations.forEach(
      (operation) =>
        (document.querySelector(
          `input[name="o"][value="${operation}"]`
        ).checked = true)
    );
    document.querySelector('input[name="t"]').value = params.total;
    document.querySelector('input[name="s"]').value = params.satisfactory;
    if (params.allowIncorrect)
      document.querySelector('input[name="i"]').checked = true;
  }
})();
