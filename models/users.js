import { Prohairesis } from "prohairesis";

const database = new Prohairesis(process.env.CLEARDB_DATABASE_URL);

export async function login({ phone, passcode }){
  try {
    const users = await database.query(`
      SELECT * FROM users WHERE
      phone = '${phone}' AND passcode = '${passcode}'
    `);

    return users.length > 0 ? {status: "OK", data: users[0]} : {status: "ERROR", data: null};
  } catch(err) { console.error(err); return {status: "ERROR", data: null}; }
}

export async function get({ accessToken }) {
  try {
    const users = await database.query(`
      SELECT * FROM users
      INNER JOIN accessTokens ON accessTokens.userId = users.id
      WHERE accessTokens.token = '${accessToken}'
    `);

    return users.length > 0 ? {status: "OK", data: users[0]} : {status: "ERROR", data: null};
  } catch(err) { console.error(err); return {status: "ERROR", data: null}; }
}

export async function create({ id, name, phone, email, passcode }){
  try {
    await database.query(`
      INSERT INTO users (id, name, phone, email, passcode)
      VALUES ('${id}', '${name}', '${phone}', '${email}', '${passcode}')
    `)

    return {status: "OK", data: null};
  } catch(err) { console.error(err); return {status: "ERROR", data: null}; }
}

export async function exist({ phone }){
  try {
    const users = await database.query(`
      SELECT * FROM users WHERE phone = '${phone}';
    `);

    return {status: users.length > 0 ? "ERROR" : "OK"};
  } catch(err) { console.error(err); return {status: "ERROR"}; }
}

export async function addToken({ id, accessToken, userId }) {
  try {
    await database.query(`
      INSERT INTO accessTokens (id, token, userId) VALUES
      ("${id}", "${accessToken}", "${userId}")
    `);
    return {status: "OK"};
  } catch(err) { console.error(err); return {status: "ERROR"}; }
}

export async function removeToken({ accessToken }) {
  try {
    await database.query(`
      DELETE FROM accessTokens WHERE token = "${accessToken}"
    `);
    return {status: "OK"};
  } catch(err) { console.error(err); return {status: "ERROR"}; }
}

export default { login, get, create, exist, addToken, removeToken }