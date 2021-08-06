import { getConnection, getRepository } from "typeorm";
import axios from "axios"

import Pokemon from "../../src/entities/Pokemon";

export async function clearDatabase () {
  await getConnection().query("TRUNCATE users RESTART IDENTITY CASCADE");
  await getConnection().query("TRUNCATE pokemons RESTART IDENTITY CASCADE");
  await getConnection().query("TRUNCATE sessions RESTART IDENTITY CASCADE");
  const pokemon = {
    name: "teste",
    number: 1,
    image: "request.data.sprites.front_default",
    weight: 1,
    height: 1,
    baseExp: 1,
    description: "descriptionaded"
  }
  await getRepository(Pokemon).insert(pokemon)
}
