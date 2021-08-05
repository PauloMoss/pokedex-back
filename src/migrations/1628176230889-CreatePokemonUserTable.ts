import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePokemonUserTable1628176230889 implements MigrationInterface {
    name = 'CreatePokemonUserTable1628176230889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemonUser" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_8f511af4ba90eed0a97da9966bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemonUser" ADD CONSTRAINT "FK_4789c9b1d4a6f840d3f825d4ac8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemonUser" ADD CONSTRAINT "FK_2f4d49b3c486c42bf246395b64d" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonUser" DROP CONSTRAINT "FK_2f4d49b3c486c42bf246395b64d"`);
        await queryRunner.query(`ALTER TABLE "pokemonUser" DROP CONSTRAINT "FK_4789c9b1d4a6f840d3f825d4ac8"`);
        await queryRunner.query(`DROP TABLE "pokemonUser"`);
    }

}
