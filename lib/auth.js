import crypto from 'crypto';
import userModel from '../models/users.js';
import createAccessToken from '../lib/createAccessToken.js';

export async function auth(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (typeof accessToken === "undefined") {
    const newAccessToken = await createAccessToken();

    res.cookie('accessToken', newAccessToken, { maxAge: 1000 * 60 * 60 * 24 })
    res.redirect("/login");
    return;
  }

  try {
    const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const { status } = await userModel.get({ accessToken: accessTokenHash });

    status === "OK" ? next() : res.redirect("/login");
  } catch(err) {
    console.error(err);
    res.clearCookie("accessToken");
    res.redirect("/login");
  }
}

export default { auth }