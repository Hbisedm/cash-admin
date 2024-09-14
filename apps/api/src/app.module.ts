import * as path from 'node:path';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { CashModule } from './cash/cash.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '.env'),
    }),
    RedisModule,
    CashModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude({ path: 'posts', method: RequestMethod.POST }) // post方法不会走这个中间件，但是其它方法会走
      .forRoutes('cash'); // 监听posts路线
  }
}
