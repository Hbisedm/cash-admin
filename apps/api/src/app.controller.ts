import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/redis/set/:key/:val')
  redisSet(@Param('key') key: string, @Param('val') val: string) {
    return this.appService.redisPut(key, val);
  }

  @Get('/redis/get/:key')
  redisGet(@Param('key') key: string) {
    return this.appService.redisGet(key);
  }
}
