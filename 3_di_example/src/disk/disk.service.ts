import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}
  getData() {
    console.log('Drawing 5W of power from Power Service');
    this.powerService.supplyPower(5);
    return 'Confidential Data';
  }
}
