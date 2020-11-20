(function main() {
  // code
  const scratchpadEl = document.getElementById("scratchpad");

  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const button = document.createElement("button");
    button.classList.add("scratchpad__button", "subtle");
    button.textContent = "🐞";
    button.dataset.state = "default";
    button.dataset.deletable = true

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const { target } = event;
      switch (target.dataset.state) {
        case "default": {
          target.dataset.state = "highlighted";
          break;
        }
        case "highlighted": {
          target.dataset.state = "transparent";
          break;
        }
        case "transparent": {
          target.dataset.state = "default";
          break;
        }
      }
    });

    scratchpadEl.appendChild(button);
  });

  const deleteButton = document.getElementById("delete-button");
  function deleteButtonListener(event) {
    if (event.target.dataset.deletable) {
      event.target.remove();
    }
  }

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (document.body.dataset.deleting) {
      document.body.removeAttribute("data-deleting");
      window.removeEventListener("click", deleteButtonListener);
    } else {
      document.body.dataset.deleting = true;
      window.addEventListener("click", deleteButtonListener);
    }
  });

  document.querySelectorAll('.operation-button').forEach(button => {
      button.addEventListener('click', event => {
          event.preventDefault();
          const b = document.createElement('button')
          b.classList.add('subtle')
          b.dataset.deletable = true
          b.textContent = button.textContent
          scratchpadEl.appendChild(b)
      })
  })
})();
