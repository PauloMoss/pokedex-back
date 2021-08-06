import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";

import app, { init } from "../../src/app";
import Pokemon from "../../src/entities/Pokemon";
import PokemonUser from "../../src/entities/PokemonUser";
import { userValidLogin } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /my-pokemons/:id/add", () => {
    it("returns status 200 for added new pokemon", async () => {
  
      const token = await userValidLogin()
  
      const response = await supertest(app).post("/my-pokemons/1/add").set('Authorization', token);
  
      expect(response.status).toEqual(200);
    })
  
    it("returns pokemons owned by the user", async () => {
  
      const token = await userValidLogin()
  
      await supertest(app).post("/my-pokemons/1/add").set('Authorization', token);
      const pokemons = await getRepository(Pokemon).find({relations:["pokemonUser"]});
  
      expect(pokemons).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            pokemonUser: [{id:1,userId:1,pokemonId:1,}]
          })
        ])
      );
    })
  
    it("returns status 401 for unauthorized user", async () => {
  
      const token = await userValidLogin()
  
      const response = await supertest(app).post("/my-pokemons/1/add").set('Authorization', "MeuTokenMuitoFake");
  
      expect(response.status).toEqual(401);
    })
  })
  
  describe("POST /my-pokemons/:id/remove", () => {
    it("returns status 200 for added new pokemon", async () => {
      
      const token = await userValidLogin()
  
      const response = await supertest(app).post("/my-pokemons/1/remove").set('Authorization', token);
  
      expect(response.status).toEqual(200);
    });
  
    it("returns pokemons owned by the user", async () => {
      
      const token = await userValidLogin()
      await getRepository(PokemonUser).insert({userId: 1, pokemonId: 1})
  
      await supertest(app).post("/my-pokemons/1/remove").set('Authorization', token);
      const pokemons = await getRepository(Pokemon).find({relations:["pokemonUser"]});
  
      expect(pokemons).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            pokemonUser: []
          })
        ])
      );
    })
  
    it("returns status 401 for unauthorized user", async () => {
  
      const token = await userValidLogin()
  
      const response = await supertest(app).post("/my-pokemons/1/remove").set('Authorization', "MeuTokenMuitoFake");
  
      expect(response.status).toEqual(401);
    })
  })
  
  describe("GET /pokemons", () => {
    it("returns status 200 and array of pokemons", async () => {
  
      const token = await userValidLogin();
  
      const response = await supertest(app).get("/pokemons").set('Authorization', token);
  
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "teste",
            number: 1,
            image: "request.data.sprites.front_default"
          })
        ])
      );
    })
  
    it("returns status 401 for unauthorized user", async () => {
  
      const token = await userValidLogin()
  
      const response = await supertest(app).get("/pokemons").set('Authorization', "MeuTokenMuitoFake");
  
      expect(response.status).toEqual(401);
    })
  })