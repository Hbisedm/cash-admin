import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  @Inject(RedisService)
  private redisService: RedisService;

  getHello(): string {
    return 'Hello World!';
  }

  redisPut(key: string, value: string) {
    this.redisService.set(key, value);
    return this.redisService.get(key);
  }

  redisGet(key: string) {
    return this.redisService.get(key);
  }
}
