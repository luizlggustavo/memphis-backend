import { Injectable, HttpService } from '@nestjs/common';

import { of } from 'rxjs';
import { createHmac } from 'crypto';
import { stringify } from 'querystring';
import { map, catchError } from 'rxjs/operators';
import { ApiDados } from '../../models/api-dados.model';
import { ENDPOINT_API, ENDPOINT_TRADE_PATH, environment, ENDPOINT_TRADE_API } from '../../environment';

@Injectable()
export class MercadoBitcoinService {

    config = {
        KEY: environment.key,
        SECRET: environment.secret,
        PIN: environment.PIN,
        CURRENCY: 'BTC'
    }

    constructor
        (
            private httpService: HttpService
        ) { }

    async callApiDadosMercadoBitcoin(apiDados: ApiDados) {
        return this.httpService.get(`${ENDPOINT_API}/${apiDados.moeda}/${apiDados.metodo}`)
            .pipe(
                map(item => item.data)
            )
    }

    async callApiNegociacoesMercadoBitcoin(apiDados: ApiDados) {
        return this.httpService.get(`${ENDPOINT_API}/${apiDados.moeda}/${apiDados.metodo}`).pipe(
            map(response => response.data), // This is important otherwise - circular JSON error
            catchError((error: any) => {
                error(`[[[[ ERROR TRYING TO FETCH: ${error.message} ]]]]`);
                return of()
            })
        ).toPromise();
    }

    async genericao(metodo, parametros) {
        var numeroArbitrario = Math.round(new Date().getTime() / 1000)
        var queryString = stringify({ 'tapi_method': metodo, 'tapi_nonce': numeroArbitrario })
        if (parametros) queryString += '&' + stringify(parametros) + 'coin_pair=BRLBTC'
        var signature = createHmac('sha512', this.config.SECRET)
            .update(ENDPOINT_TRADE_PATH + '/?' + queryString)
            .digest('hex')
        const headers = {
            'TAPI-ID': this.config.KEY,
            'TAPI-MAC': signature,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return this.httpService.post(ENDPOINT_TRADE_API + '/?' + queryString, queryString, { headers }).pipe(
            map(response => response.data), // This is important otherwise - circular JSON error
            catchError((error: any) => {
                error(`[[[[ ERROR TRYING TO FETCH: ${error.message} ]]]]`);
                return of()
            })
        ).toPromise();
    }

}
