import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        {
          emit: 'stdout',
          level: 'query' as const,
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    // //@ts-ignore
    // this.$on('query', async (e) => {
    //   //@ts-ignore
    //   const timestamp = new Date();
    //   //@ts-ignore
    //   const query = e.query;
    //   //@ts-ignore
    //   const params = JSON.parse(e.params);
    //   //@ts-ignore
    //   const duration = e.duration;
    //   console.log({
    //     Timestamp: timestamp,
    //     Query: query,
    //     Params: params,
    //     Duration: duration,
    //   });
    // });
  }

  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
