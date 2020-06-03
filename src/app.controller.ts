import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';

import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { Usuario } from './models/usuario.model';

@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody(
    {
      type: Usuario,
    },
  )
  async login(@Body() usuario: Usuario) {
    return this.authService.login(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get('usuario/perfil')
  getProfile(@Request() req) {
    return req.user;
  }

}
