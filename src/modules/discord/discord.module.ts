import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { PlaceModule } from '../place/place.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [DiscordService],
  imports: [PlaceModule, UserModule],
})
export class DiscordModule {}
