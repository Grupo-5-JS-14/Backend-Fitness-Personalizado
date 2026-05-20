import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "../../usuarios/entities/usuarios.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_dietas" })
export class Dieta {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;


    @Column("decimal", { precision: 5, scale: 2, nullable: true })
    @ApiProperty()
    imc?: number;


    @IsNotEmpty()
    @Column()
    @ApiProperty()
    tipo!: string;

    @IsNotEmpty()
    @Column()
    @ApiProperty()
    descricao!: string;

    @UpdateDateColumn()
    @ApiProperty()
    data!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.dietas, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}