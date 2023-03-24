document.querySelectorAll(".TextInput-element").forEach(el => el.addEventListener("keyup", handleKeypress));
document.querySelectorAll(".TextInput-element").forEach(el => el.addEventListener("change", handleChange));
document.querySelector(".SubmitButton").addEventListener("click", handleSubmit);
document.querySelector(".cancel-button").addEventListener("click", handleCancel)

let step = 1;

const account = {
  name: null,
  email: null,
  phone: null,
  code: null,
}

function handleSubmit() {
  switch (step) {
    case 1:
      if (account.code === null) {
        return;
      }

      step++;
      document.querySelector(".title").innerText = "Skapa konto"
      document.querySelector(".SubmitButton-Text").innerText = "Nästa"
      document.querySelector(".code-content").style.display = "none";
      document.querySelector(".signup-content").style.display = "block";
      document.querySelector(".SubmitButton").classList.add("SubmitButton--incomplete");
      break;

    case 2:
      if (account.name === null || account.phone === null || account.email === null) {
        return;
      }

      document.querySelector(".container").style.display = "none";
      document.querySelector(".overlay-container").style.display = "flex";
      break;
  
    default:
      break;
  }

  
}

function handleCancel() {
  const items = document.querySelectorAll(".passcode-skeleton-item");
  items.forEach(item => item.style.backgroundColor = "#00000000");

  passcode = "";

  document.querySelector(".container").style.display = "flex";
  document.querySelector(".overlay-container").style.display = "none";
}

function handleChange(event) {
  const key = event.target.attributes["data-key"].value;
  const value = event.target.value;

  if (value.trim() === "") return;

  account[key] = value;
}

function handleKeypress(event) {
  const key = event.target.attributes["data-key"].value;

  if (key == "code") {
    if (document.querySelector(".SubmitButton").classList.contains("SubmitButton--incomplete")) {
      document.querySelector(".SubmitButton").classList.remove("SubmitButton--incomplete");
    }
    return;
  }

  const items = Object.values(account).filter(x => x === null);
  if (items.length > 1) return;

  if (event.target.value.trim() === "") return;

  if (document.querySelector(".SubmitButton").classList.contains("SubmitButton--incomplete")) {
    document.querySelector(".SubmitButton").classList.remove("SubmitButton--incomplete");
  }
}



let passcode = "";

const passcodeButtons = document.querySelectorAll(".passcode-button");
for (let i = 0; i < passcodeButtons.length; i++) {
  const button = passcodeButtons[i];

  button.addEventListener("click", handleButtonClick);
}

function handleButtonClick(event) {
  const key = event.target.attributes["data-key"].value;

  if (passcode.length < 6) {
    passcode += key;
  }
  
  updatePasscodeLength();

  if (passcode.length >= 6) {
    handleSignup();
  }
}

function updatePasscodeLength() {
  const items = document.querySelectorAll(".passcode-skeleton-item");
  items.forEach(item => item.style.backgroundColor = "#00000000");

  for (let i = 0; i < passcode.length; i++) {
    const item = items[i];
    
    item.style.backgroundColor = "var(--font-color-dark)";
  }
}

async function handleSignup() {
  const items = Object.values(account).filter(x => x === null);
  if (items.length > 0) return;

  account.passcode = passcode;

  const params = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(account)
  };

  const response = await fetch("/signup", params);
  const { status } = await response.json();

  if (status === "ERROR") {
    handleCancel();
    alert("error");
    return;
  }
  
  window.location.href = "/";
}