import { Module, HttpModule } from '@nestjs/common';
// import { DatabaseModule } from '../database/database.module'
import { MercadoBitcoinService } from './mercadobitcoin.service';
import { MercadoBitcoinController } from './mercadobitcoin.controller';
import { MercadoBitcoinProviders } from './mercadobitcoin.providers';

@Module({
  imports: [
    // DatabaseModule,
    HttpModule,
  ],
  providers: [
    MercadoBitcoinService,
    ...MercadoBitcoinProviders,
  ],
  controllers: [
    MercadoBitcoinController,
  ],
})
export class MercadoBitcoinModule { }
