import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './controllers/app.controller';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
