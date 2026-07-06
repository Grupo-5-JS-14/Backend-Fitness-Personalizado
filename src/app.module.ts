import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsuarioModule } from './usuarios/usuarios.module';
import { DietaModule } from './dieta/dieta.module';
import { TreinoModule } from './treinos/treinos.module';
import { DevService } from './data/services/dev.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DevService,
      imports:[ConfigModule]
    }),
    UsuarioModule,
    DietaModule,
    TreinoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}