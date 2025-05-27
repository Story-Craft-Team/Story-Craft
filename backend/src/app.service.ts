import { Injectable } from '@nestjs/common';

export interface HealthResponse {
  response: number;
  status: string;
}

@Injectable()
export class AppService {
  health(): HealthResponse {
    try {
      return { response: 200, status: 'all good' };
    } catch (error) {
      throw error;
    }
  }
}
