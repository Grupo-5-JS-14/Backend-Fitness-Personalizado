import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuarios.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_treinos" })
export class Treinos {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @Column()
    @ApiProperty()
    tipoTreino!: string;

    @Column({ type: "text" })
    @ApiProperty()
    descricao!: string;

    @Column({ type: "date" })
    @ApiProperty()
    data!: Date;

    @Column()
    @ApiProperty()
    intensidade!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.treinos, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}