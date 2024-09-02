import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { PlaceService } from 'src/modules/place/place.service';

dotenv.config();

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(private readonly placeService: PlaceService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  async onModuleInit() {
    try {
      await this.client.login(process.env.DISCORD_TOKEN);
      console.log('Bot logged in successfully');

      this.client.on('ready', () => {
        console.log(`Logged in as ${this.client.user.tag}!`);
      });

      this.client.on('messageCreate', async (message) => {
        if (message.content === '!점심 추천') {
          const restaurants = (
            await this.placeService.getPlaceList({
              lat: '37.52361111',
              lon: '126.8983417',
              range: 1,
              sort: '평점순',
            })
          ).splice(0, 6);

          const restaurantMessages = restaurants
            .map((restaurant) => {
              return `${restaurant.id}. ${restaurant.type}: ${restaurant.name} (${restaurant.address})`;
            })
            .join('\n');

          message.reply(`Restaurant list:\n${restaurantMessages}`);
        }
      });
    } catch (err) {
      console.error('Failed to log in:', err);
    }
  }
}
