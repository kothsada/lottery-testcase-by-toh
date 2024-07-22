import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotteryModule } from './lottery/lottery.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [LotteryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
