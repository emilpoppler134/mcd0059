import crypto from 'crypto';
import userModel from '../models/users.js';
import tokenModel from '../models/tokens.js';
import id from '../lib/id.js';
import render from '../lib/render.js';

/* Views */
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

/* USER CONTROLLER */
export async function login(req, res) {
  const accessToken = req.cookies.accessToken;
  const phone = req.body.phone;
  const passcode = req.body.passcode;

  if (typeof phone === "undefined" || typeof passcode === "undefined") {
    res.json({status: "ERROR", data: null});
    return;
  }

  const { status, data } = await userModel.login({ phone: phone, passcode: passcode });
  
  if (status === "ERROR") {
    res.json({status: "ERROR", data: null});
    return;
  }
  
  const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
  await userModel.removeToken({ accessToken: accessTokenHash });
  await userModel.addToken({ id: id.create("token"), accessToken: accessTokenHash, userId: data.id });

  res.json({status: "OK", data: null});
}

export async function signup(req, res) {
  const item = req.body;
  const requirements = ["name", "phone", "email", "token", "passcode"];

  if (!requirements.every(requirement => item.hasOwnProperty(requirement))) {
    res.json({status: "ERROR", data: "Inte tillräckligt med information."});
    return;
  }

  const exist = await userModel.get({ phone: item.phone.trim() });
  
  if (exist.status === "ERROR") {
    res.json({status: "ERROR", data: "Telefonnummer upptaget."});
    return;
  }

  item.id = id.create("user");
  const token = req.body.token.toLowerCase();
  const { status, data } = await tokenModel.get({ code: token });
  
  if (status === "ERROR") {
    res.json({status: "ERROR", data: "Fel. Försök igen senare."});
    return;
  }

  item.phone = item.phone.trim();

  await userModel.create(item);
  await tokenModel.deactivate({ id: data.id, userId: item.id });

  res.json({status: "OK", data: null});
}

export async function logout(req, res) {
  const accessToken = req.cookies.accessToken;

  const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
  const { status } = await userModel.removeToken({ accessToken: accessTokenHash });

  if (status === "ERROR") {
    res.json({status: "ERROR", data: null});
    return;
  }

  res.json({status: "OK", data: null});
}

/* TOKEN CONTROLLER */
export async function getToken(req, res) {
  const code = req.params.code;

  if (typeof code === "undefined") {
    res.json({status: "ERROR", data: null});
    return;
  }

  const { status } = await tokenModel.get({ code: code });
  
  if (status === "ERROR") {
    res.json({status: "ERROR", data: null});
    return;
  }

  res.json({status: "OK", data: null});
}

/* CHECKOUT CONTROLLER */
export async function charge(req, res) {
  
}

export default { view, confirmationView, loginView, signupView, login, signup, logout, getToken, charge }