import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { Bcrypt } from "../bycript/bycript";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuarios/service/usuarios.service";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService, 
        private jwtService: JwtService, 
        private bcrypt: Bcrypt 
    ) { }

    async validateUser(username: string, password: string): Promise<any> {

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if (!buscaUsuario)
            throw new HttpException('Usuário ou senha não encontrados!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenha(password, buscaUsuario.senha)

        if (!matchPassword)
            throw new HttpException('Usuário ou senha não encontrados!', HttpStatus.NOT_FOUND)

        if (buscaUsuario && matchPassword) {

            const { senha, ...resposta } = buscaUsuario
            return resposta
        }
        return null
    }

   async login(usuarioLogin: UsuarioLogin) {
    const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

    if (!buscaUsuario) {
        throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const matchPassword = await this.bcrypt.compararSenha(
        usuarioLogin.senha,
        buscaUsuario.senha
    )

    if (!matchPassword) {
        throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const payload = {
        sub: buscaUsuario.id,
        usuario: buscaUsuario.usuario
    }

    return {
        id: buscaUsuario.id,
        nome: buscaUsuario.nome,
        usuario: buscaUsuario.usuario,
        foto: buscaUsuario.foto,
        token: `Bearer ${this.jwtService.sign(payload)}`,
    }
}
    }
