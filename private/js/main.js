document.querySelector(".logout-button").addEventListener("click", handleLogout);

async function handleLogout() {
  const response = await fetch("/logout", { method: "POST" });
  const { status } = await response.json();

  if (status === "OK") {
    window.location.href = "/login";
  }
}