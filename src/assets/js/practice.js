import { symbolMap } from "./operations.js";
import { get } from "./search-params.js";

(function main() {
  // Code
  const params = get();
  console.log({ params });

  const problemForm = document.getElementById("problem-form");

  function generateProblem() {
    const number1 =
      params.numbers[Math.floor(Math.random() * params.numbers.length)];
    const number2 =
      params.numbers[Math.floor(Math.random() * params.numbers.length)];
    const operation =
      params.operations[Math.floor(Math.random() * params.operations.length)];
    const problemString = `${number1} ${symbolMap[operation]} ${number2}`;
    // TODO: Look into safer alternatives
    const answer = eval(problemString);
    problemForm.innerHTML = `
    <label>
    <span>${problemString} = </span>
    <input name="input" type="number" />
    </label>
    <button>Enter</button>
    `;

    problemForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = Number(new FormData(problemForm).get("input"));
      // TODO: It thinks correct answers are wrong for a moment before thinking
      // they are correct. It could be a race condition. Maybe try clearing the
      // innerHTML before generating a new problem?
      if (input === answer) {
        alert("Success!");
        generateProblem();
      } else {
        alert("Try again!");
      }
    });
  }

  generateProblem();
})();
