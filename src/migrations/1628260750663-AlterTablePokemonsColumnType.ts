import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTablePokemonsColumnType1628260750663 implements MigrationInterface {
    name = 'AlterTablePokemonsColumnType1628260750663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "height" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "weight" character varying NOT NULL`);
    }

}
