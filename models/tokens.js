import { Prohairesis } from "prohairesis";

const database = new Prohairesis(process.env.CLEARDB_DATABASE_URL);

export async function get({ code }){
  try {
    const tokens = await database.query(`
      SELECT * FROM tokens WHERE code = '${code}' AND active = 1
    `);

    return tokens.length > 0 ? {status: "OK", data: tokens[0]} : {status: "ERROR", data: null};
  } catch(err) { console.error(err); return {status: "ERROR", data: null}; }
}

export async function deactivate({ id, userId }){
  try {
    await database.query(`
      UPDATE tokens SET active = 0, userId = '${userId}' WHERE id = '${id}'
    `);

    return {status: "OK", data: null};
  } catch(err) { console.error(err); return {status: "ERROR", data: null}; }
}

export default { get, deactivate }