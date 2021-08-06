import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PokemonUser from "./PokemonUser";

@Entity("pokemons")
export default class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  baseExp: number;

  @Column({nullable: true})
  description: string;
  
  @OneToMany(() => PokemonUser, pokemonUser => pokemonUser.pokemon)
  pokemonUser: PokemonUser[]
}