import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PokemonUser from "./PokemonUser";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PokemonUser, pokemonUser => pokemonUser.user)
  pokemonUser: PokemonUser[]
}
