import { getConnection, getRepository } from "typeorm";
import axios from "axios"

import Pokemon from "../../src/entities/Pokemon";

export async function clearDatabase () {
  await getConnection().query("TRUNCATE users RESTART IDENTITY CASCADE");
  //await getConnection().query("TRUNCATE period RESTART IDENTITY CASCADE");
}


export async function populateDatabase() {
  
  for(let i = 1; i < 31 ; i++){
    const request: any = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const pokemon = {
      name: request.data.name,
      number: request.data.order,
      image: request.data.sprites.front_default,
      weight: request.data.weight,
      height: request.data.height,
      baseExp: request.data.base_experience,
      description: ""
    }

    const descriptionRequest: any = await axios.get(`https://pokeapi.co/api/v2/characteristic/${i}/`);

    const descriptions: {description:string, language: {name: string, url: string}}[] = descriptionRequest.data.descriptions;

    pokemon.description = descriptions.find(d => d.language.name === "en").description;

    await getRepository(Pokemon).insert(pokemon)
  }
}
