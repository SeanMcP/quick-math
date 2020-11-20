import { symbolMap } from "./operations.js";
import { get } from "./search-params.js";

(function main() {
  // Code
  const params = get();
  console.log({ params });

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const formContainer = document.getElementById("form-container");
  const generateProblemEvent = new CustomEvent("generate-problem", {
    bubbles: true,
  });

  function generateProblem() {
    const problemForm = document.createElement("form");
    // Ensure the larger number is first
    const [number1, number2] = [
      randomItem(params.numbers),
      randomItem(params.numbers),
    ].sort((a, b) => b - a);

    const operation = symbolMap[randomItem(params.operations)];
    // NOTE: See note in operations.js
    // TODO: Look into safer alternatives to eval()
    problemForm.innerHTML = `
    <label>
    <span>${number1} ${operation.display} ${number2} = </span>
    <input name="input" step="any" type="number" data-answer="${eval(
      `${number1} ${operation.operator} ${number2}`
    )}" />
    </label>
    <button>Enter</button>
    `;

    problemForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputEl = problemForm.querySelector('input[name="input"]');
      if (inputEl.dataset.answer === inputEl.value) {
        alert("Success!");
        problemForm.dispatchEvent(generateProblemEvent);
      } else {
        alert("Try again!");
      }
    });

    formContainer.textContent = "";
    formContainer.appendChild(problemForm);
  }

  window.addEventListener("generate-problem", generateProblem);
  window.dispatchEvent(generateProblemEvent);
})();
