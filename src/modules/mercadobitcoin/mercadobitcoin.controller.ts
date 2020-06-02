import { Controller, Post, Body, Get, Param, Put, Delete, Head } from '@nestjs/common';
import { MercadoBitcoinService } from './mercadobitcoin.service';
import { ApiOperation, ApiTags, ApiParam, ApiBody, ApiHeaders } from '@nestjs/swagger';
import { ApiDados } from '../../models/api-dados.model';
// import { Proprietario } from '../schemas/proprietario.dto';

@ApiTags('Mercado Bitcoin')
@Controller('api')
export class MercadoBitcoinController {

    constructor
        (private mercadoBitcoinService: MercadoBitcoinService,
    ) { }

    @Post('/dados')
    @ApiBody(
        {
            type: ApiDados
        }
    )
    @ApiOperation({ summary: 'Consulta na API de Dados do Mercado Bitcoin' })
    async consultaApiDados(
        @Body() apiDados: ApiDados
    ) {
        return this.mercadoBitcoinService.callApiDadosMercadoBitcoin(apiDados)
    }

    @Post('/negociacoes')
    @ApiBody(
        {
            type: ApiDados
        }
    )
    @ApiOperation({ summary: 'Consulta na API de Negociações do Mercado Bitcoin' })
    async consultaApiNegociacoes(
        @Body() apiDados: ApiDados
    ) {
        return this.mercadoBitcoinService.genericao(apiDados.metodo, true)
    }

}
