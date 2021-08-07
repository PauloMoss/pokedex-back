import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req:Request, res: Response) {
    try{
        const userId = res.locals.userId;
        const pokemons = await pokemonService.getAllPokemons(userId)

        res.send(pokemons);

    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export async function addPokemon(req:Request, res: Response) {
    try{
        const pokemonId = Number(req.params.id);
        const userId = res.locals.userId;

        
        await pokemonService.addMyNewPokemon(pokemonId, userId)

        res.sendStatus(200);

    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export async function removePokemon(req:Request, res: Response) {
    try{
        const pokemonId = Number(req.params.id);
        const userId = res.locals.userId;

        
        await pokemonService.removeMyOldPokemon(pokemonId, userId)

        res.sendStatus(200);

    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}