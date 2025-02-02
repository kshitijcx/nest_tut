import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplePower(watts: number) {
    console.log(`Supplying ${watts}W of power`);
  }
}
