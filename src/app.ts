import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";
import authMiddleware from "./middlewares/authMiddleware";

import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.get("/pokemons", authMiddleware, pokemonController.getPokemons);

app.post("/my-pokemons/:id/add", authMiddleware, pokemonController.addPokemon);

app.post("/my-pokemons/:id/remove", authMiddleware, pokemonController.removePokemon);

export async function init () {
  await connectDatabase();
}

export default app;
