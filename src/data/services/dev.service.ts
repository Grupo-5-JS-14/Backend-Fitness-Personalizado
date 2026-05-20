import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuarios/entities/usuarios.entity";
import { Dieta } from "../../dieta/entities/dieta.entity";
import { Treinos } from "../../treinos/entities/treinos.entity";


@Injectable()
export class DevService implements TypeOrmOptionsFactory{


    createTypeOrmOptions(): TypeOrmModuleOptions {

        return{

            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '110294',
            database:'db_vittafit',
            entities: [Usuario, Treinos, Dieta ],
            synchronize: true,
        }
        
    }
}