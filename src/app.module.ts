import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadoBitcoinModule } from './modules/mercadobitcoin/mercadobitcoin.module';

@Module({
  imports: [
    
    MercadoBitcoinModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
