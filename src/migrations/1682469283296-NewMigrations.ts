import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1682469283296 implements MigrationInterface {
    name = 'NewMigrations1682469283296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_ef81d4c23fad6226da3471c4016"`);
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_788458ce26067f884057bd276e7"`);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_788458ce26067f884057bd276e7" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_ef81d4c23fad6226da3471c4016" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_ef81d4c23fad6226da3471c4016"`);
        await queryRunner.query(`ALTER TABLE "booking_guest" DROP CONSTRAINT "FK_788458ce26067f884057bd276e7"`);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_788458ce26067f884057bd276e7" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_guest" ADD CONSTRAINT "FK_ef81d4c23fad6226da3471c4016" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
