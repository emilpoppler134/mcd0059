document.querySelectorAll(".TextInput-element").forEach(el => el.addEventListener("keyup", handleKeypress));
document.querySelectorAll(".TextInput-element").forEach(el => el.addEventListener("change", handleChange));
document.querySelector(".SubmitButton").addEventListener("click", handleSubmit);
document.querySelector(".cancel-button").addEventListener("click", handleCancel)

const account = {
  phone: null,
}

function handleSubmit() {
  if (account.phone.trim() === "") {
    if (!document.querySelector(".TextInput").classList.contains("empty")) {
      document.querySelector(".TextInput").classList.add("empty");
    }
    return;
  }

  document.querySelector(".container").style.display = "none";
  document.querySelector(".overlay-container").style.display = "flex";
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

function handleKeypress() {
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
    handleLogin();
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

async function handleLogin() {
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

  const response = await fetch("/login", params);
  const { status } = await response.json();

  if (status === "ERROR") {
    handleCancel();
    alert("error");
    return;
  }
  
  window.location.href = "/";
}