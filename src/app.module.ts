import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadoBitcoinModule } from './modules/mercadobitcoin/mercadobitcoin.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MercadoBitcoinModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    UsersService,
  ],
})
export class AppModule { }
