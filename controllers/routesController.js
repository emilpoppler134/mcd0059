import render from '../lib/render.js';

export function view(req, res) {
  render("index.html", res);
}

export function confirmationView(req, res) {
  render("confirmation.html", res);
}

export function loginView(req, res) {
  render("login.html", res);
}

export function signupView(req, res) {
  render("signup.html", res);
}

export function pinView(req, res) {
  render("pin.html", res);
}


export async function login(req, res) {
  res.json({ status: "OK" });
}

export default { view, confirmationView, loginView, signupView, pinView, login }