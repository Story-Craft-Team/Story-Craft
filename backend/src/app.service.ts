import { Injectable } from '@nestjs/common';
import { HealthRes } from './common/types';

@Injectable()
export class AppService {
  health(): HealthRes {
    try {
      return { response: 200, status: "all good" };
    } catch (error) {
      return { response: 500, status: 'Error on server' };
    }
  }
}

// перенести респонс по структуре