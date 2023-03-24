const inputs = document.querySelectorAll(".TextInput-element");
inputs.forEach(input => {
  input.addEventListener("focus", handleInputFocus);
  input.addEventListener("focusout", handleInputFocusOut);
  input.addEventListener("change", handleInputChange);
});

function handleInputFocus(event) {
  const input = event.target;

  if (!input.parentElement.querySelector(".TextInput-key").classList.contains("TextInput-key-shrink")) {
    input.parentElement.querySelector(".TextInput-key").classList.add("TextInput-key-shrink");
  }
}

function handleInputFocusOut(event) {
  const input = event.target;

  if (input.value.trim() === "") {
    if (input.parentElement.querySelector(".TextInput-key").classList.contains("TextInput-key-shrink")) {
      input.parentElement.querySelector(".TextInput-key").classList.remove("TextInput-key-shrink");
    }
  }
}

function handleInputChange(event) {
  const input = event.target;

  if (input.value.trim() !== "") {
    if (!input.parentElement.querySelector(".TextInput-key").classList.contains("TextInput-key-shrink")) {
      input.parentElement.querySelector(".TextInput-key").classList.add("TextInput-key-shrink");
    }
  }
}