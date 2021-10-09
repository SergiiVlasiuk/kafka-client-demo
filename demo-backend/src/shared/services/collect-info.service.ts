import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectInfoService {
  public collectData() {
    return [
      { name: 'collected data', description: 'it is stub for collected data' },
      { name: 'more data', description: 'other stub' },
    ];
  }
}
