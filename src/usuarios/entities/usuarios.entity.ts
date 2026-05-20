import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dieta } from "../../dieta/entities/dieta.entity";
import { Treinos } from "../../treinos/entities/treinos.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @IsNotEmpty()
    @Column({ length: 255 })
    @ApiProperty()
    nome!: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255 })
    @ApiProperty()
    usuario!: string;

    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255 })
    @ApiProperty()
    senha!: string;

    @Column({ length: 5000, nullable: true })
    @ApiProperty()
    foto!: string;

    @IsNotEmpty()
    @Column("decimal", { precision: 5, scale: 2 })
    @ApiProperty()
    altura!: number;

    @IsNotEmpty()
    @Column("decimal", { precision: 10, scale: 2 })
    @ApiProperty()
    peso!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    @ApiProperty()
    imc!: number;

    @OneToMany(() => Dieta, (dieta) => dieta.usuario)
    dietas!: Dieta[];

    @OneToMany(() => Treinos, (treino) => treino.usuario)
    treinos!: Treinos[];

}