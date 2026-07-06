import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../service/usuarios.service";
import { Usuario } from "../entities/usuarios.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Usuarios")
@Controller("/usuario")
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Get()
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
}

@Get("/:id")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
findById(@Param("id", ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
}

@Post()
create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
}

@Put("/:id")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
update(
    @Param("id", ParseIntPipe) id: number,
    @Body() usuario: Usuario
): Promise<Usuario> {
    usuario.id = id;
    return this.usuarioService.update(usuario);
}

@Delete("/:id")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.usuarioService.delete(id);
}
}