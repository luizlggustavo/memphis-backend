import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MercadoBitcoinService } from './mercadobitcoin.service';
import { ApiOperation, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDados } from '../../models/api-dados.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@Controller('api')
@ApiTags('Mercado Bitcoin')
export class MercadoBitcoinController {

    constructor(
        private mercadoBitcoinService: MercadoBitcoinService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('/dados')
    @ApiBody(
        {
            type: ApiDados,
        },
    )
    @ApiOperation({ summary: 'Consulta na API de Dados do Mercado Bitcoin' })
    async consultaApiDados(
        @Body() apiDados: ApiDados,
    ) {
        return this.mercadoBitcoinService.callApiDadosMercadoBitcoin(apiDados);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/negociacoes')
    @ApiBody(
        {
            type: ApiDados,
        },
    )
    @ApiOperation({ summary: 'Consulta na API de Negociações do Mercado Bitcoin' })
    async consultaApiNegociacoes(
        @Body() apiDados: ApiDados,
    ) {
        return this.mercadoBitcoinService.genericao(apiDados.metodo, true);
    }

}
