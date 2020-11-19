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
    const number1 = randomItem(params.numbers);
    const number2 = randomItem(params.numbers);
    const operation = randomItem(params.operations);
    const problemString = `${number1} ${symbolMap[operation]} ${number2}`;
    // TODO: Look into safer alternatives to eval()
    problemForm.innerHTML = `
    <label>
    <span>${problemString} = </span>
    <input name="input" type="number" data-answer="${eval(problemString)}" />
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
