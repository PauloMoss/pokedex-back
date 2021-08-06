import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemon from "./Pokemon";
import User from "./User";

@Entity("pokemonUser")
export default class PokemonUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;

  @ManyToOne(() => User, user => user.pokemonUser)
  user:User

  @ManyToOne(() => Pokemon, pokemon => pokemon.pokemonUser)
  pokemon:Pokemon
}