import { encode } from "./code.js";
import { get } from "./search-params.js";

(function main() {
  // Code
  const createForm = document.getElementById("create-form");

  createForm.addEventListener("submit", () => {
    const dummyPassKeyInput = document.querySelector(
      'input[data-fake-name="p-key-dummy"]'
    );
    if (dummyPassKeyInput.value) {
      document.querySelector('input[name="p"]').value = encode(
        dummyPassKeyInput.value
      );
    }
    const dummyFailKeyInput = document.querySelector(
      'input[data-fake-name="f-key-dummy"]'
    );
    if (dummyFailKeyInput.value) {
      document.querySelector('input[name="f"]').value = encode(
        dummyFailKeyInput.value
      );
    }
  });

  const gradedSettingsEl = document.getElementById("graded-settings");
  const gradedSettingsFields = gradedSettingsEl.querySelectorAll("[name]");
  
  // Hide graded settings by default
  gradedSettingsFields.forEach((node) => {
    node.dataset.name = node.name;
    node.removeAttribute("name");
  });
  document
    .querySelector("input[name=e][value=p]")
    .addEventListener("change", () => {
      gradedSettingsEl.hidden = true;
      gradedSettingsFields.forEach((node) => {
        node.removeAttribute("name");
      });
    });
  document
    .querySelector("input[name=e][value=g]")
    .addEventListener("change", () => {
      gradedSettingsEl.removeAttribute("hidden");
      gradedSettingsFields.forEach((node) => {
        node.name = node.dataset.name;
      });
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
    if (params.graded)
      document.querySelector('input[name="e"][value="g"]').checked = true;
  }
})();
