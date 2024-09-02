import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { PlaceModule } from '../place/place.module';

@Module({
  providers: [DiscordService],
  imports: [PlaceModule],
})
export class DiscordModule {}
