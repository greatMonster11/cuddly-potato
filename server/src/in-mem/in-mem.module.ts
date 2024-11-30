import { Module } from '@nestjs/common';
import { InMemService } from './in-mem.service';

@Module({
  providers: [InMemService],
})
export class InMemModule {}
