import { symbolMap } from "./operations.js";
import { get } from "./search-params.js";
import {
  KEY,
  incrementCorrectCount,
  initializeCorrectCount,
  set,
} from "./storage.js";

(function main() {
  // Code
  const params = get();
  console.log({ params });
  initializeCorrectCount();
  set(KEY.fail, params.failKey);
  set(KEY.pass, params.passKey);
  set(KEY.satisfactory, params.satisfactory);

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const formContainer = document.getElementById("form-container");

  const endPracticeEvent = new CustomEvent("end-practice", { bubbles: true });
  const generateProblemEvent = new CustomEvent("generate-problem", {
    bubbles: true,
  });
  const incrementProgressEvent = new CustomEvent("increment-progress", {
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
        incrementCorrectCount();
        window.dispatchEvent(incrementProgressEvent);
        problemForm.dispatchEvent(generateProblemEvent);
      } else {
        if (params.graded) {
          alert(`So close! The correct answer was ${inputEl.dataset.answer}`);
          window.dispatchEvent(incrementProgressEvent);
          problemForm.dispatchEvent(generateProblemEvent);
        } else {
          alert("Try again!");
        }
      }
    });

    formContainer.textContent = "";
    formContainer.appendChild(problemForm);
  }

  const progressElement = document.getElementById("progress-indicator");
  progressElement.max = params.total;

  window.addEventListener("increment-progress", () => {
    const nextValue = Number(progressElement.value) + 1;
    progressElement.value = nextValue;
    progressElement.textContent = (nextValue / params.total) * 100 + "%";
    if (nextValue >= params.total) {
      window.dispatchEvent(endPracticeEvent);
    }
  });

  window.addEventListener("end-practice", () => {
    location.href = location.origin + "/done/";
  });

  window.addEventListener("generate-problem", generateProblem);
  window.dispatchEvent(generateProblemEvent);

  document.getElementById("edit-link").href =
    `/` + location.search + "&edit=true";
})();
