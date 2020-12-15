import { get, KEY } from "./storage.js";

(function main() {
  // Code
  const outputEl = document.getElementById("output");
  const correct = get(KEY.count);
  const satisfactory = get(KEY.satisfactory);
  const failKey = get(KEY.fail);
  const passKey = get(KEY.pass);

  if (passKey && failKey) {
    outputEl.innerHTML = `
      <p>Great practicing! Share this key with your teacher:</p>
      <p style="font-size:5rem;font-weight:bold;text-align:center;">
        ${correct >= satisfactory ? passKey : failKey}
      </p>
    `;
  }

  outputEl.removeAttribute("hidden");
})();
