// act as a gateway
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SERVICE_A') private readonly clientA: ClientProxy,
    @Inject('SERVICE_B') private readonly clientB: ClientProxy,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const resultA$ = this.clientA.send('getHello', '');
    const resultA = await firstValueFrom(
      resultA$.pipe(timeout({ first: 5_000 })),
    );
    const resultB$ = this.clientB.send('getHello', '');
    const resultB = await firstValueFrom(
      resultB$.pipe(timeout({ first: 5_000 })),
    );
    return this.appService.getHello(resultA, resultB);
  }
}
