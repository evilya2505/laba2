import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1682463276046 implements MigrationInterface {
    name = 'NewMigrations1682463276046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "bookingnumber" integer NOT NULL, "createdate" TIMESTAMP NOT NULL, "datefrom" TIMESTAMP NOT NULL, "dateto" TIMESTAMP NOT NULL, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guests" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phonenumber" integer NOT NULL, "emailaddress" character varying NOT NULL, CONSTRAINT "PK_4948267e93869ddcc6b340a2c46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking_guest" ("booking_id" integer NOT NULL, "guest_id" integer NOT NULL, CONSTRAINT "PK_1d14b2d0b0c1ceaadf5f25d3dbc" PRIMARY KEY ("booking_id", "guest_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef81d4c23fad6226da3471c401" ON "booking_guest" ("booking_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_788458ce26067f884057bd276e" ON "booking_guest" ("guest_id") `);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_ef81d4c23fad6226da3471c4016" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_788458ce26067f884057bd276e7" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_ef81d4c23fad6226da3471c4016" FOREIGN KEY ("booking_id") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_788458ce26067f884057bd276e7" FOREIGN KEY ("guest_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_788458ce26067f884057bd276e7"`);
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_ef81d4c23fad6226da3471c4016"`);
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_788458ce26067f884057bd276e7"`);
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_ef81d4c23fad6226da3471c4016"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_788458ce26067f884057bd276e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef81d4c23fad6226da3471c401"`);
        await queryRunner.query(`DROP TABLE "booking_guest"`);
        await queryRunner.query(`DROP TABLE "guests"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
