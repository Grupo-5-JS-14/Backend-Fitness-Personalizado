import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsuarioModule } from './usuarios/usuarios.module';
import { DietaModule } from './dieta/dieta.module';
import { TreinoModule } from './treinos/treinos.module';
import { ProdService } from './data/services/prod.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports:[ConfigModule]
    }),
    UsuarioModule,
    DietaModule,
    TreinoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}