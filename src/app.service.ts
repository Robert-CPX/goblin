import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(serviceA: string, serviceB: string): string {
    return `service a says: ${serviceA} and service b says: ${serviceB}`;
  }
}
