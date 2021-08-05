import { getConnection } from "typeorm";

import User from "../../src/entities/User";

export async function clearDatabase () {
  await getConnection().query("TRUNCATE users RESTART IDENTITY CASCADE");
  //await getConnection().query("TRUNCATE period RESTART IDENTITY CASCADE");
}
