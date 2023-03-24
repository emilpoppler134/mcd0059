import crypto from 'crypto';
import Users from '../models/users.js';
import id from './id.js';

export default async function createAccessToken() {
  let accessToken;

  while (true) {
    accessToken = id.create("token");

    const AccessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const user = await Users.get(AccessTokenHash);

    if (!user) {
      break;
    }
  }

  return accessToken;
}
