import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";
import PokemonUser from "../entities/PokemonUser";
import {populateDatabase} from "../utils/populateDatabaseFunction"

export async function getAllPokemons(userId: number) {

    const repository = getRepository(Pokemon);

    let allPokemons = await repository.find({relations:["pokemonUser"]});

    if(allPokemons.length === 0 && process.env.NODE_ENV !== "test") {
        await populateDatabase();
        allPokemons = await repository.find({relations:["pokemonUser"]});
    }

    const pokemons = allPokemons.map(p => {
        const myPokemon = p.pokemonUser.find(mp => userId === mp.userId)
        let inMyPokemons: boolean;
        if(myPokemon) {
            inMyPokemons = true
        } else {
            inMyPokemons = false
        }

        return {...p, inMyPokemons, pokemonUser: undefined}
    })
    return pokemons;
}

export async function addMyNewPokemon(pokemonId:number, userId:number) {

    const repository = getRepository(PokemonUser);

    await repository.insert({ userId, pokemonId })
}

export async function removeMyOldPokemon(pokemonId:number, userId:number) {

    const repository = getRepository(PokemonUser);

    await repository.delete({ userId, pokemonId })
}