import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { PlaceService } from 'src/modules/place/place.service';
import { UserService } from '../user/user.service';

dotenv.config();

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(
    private readonly placeService: PlaceService,
    private readonly userService: UserService,
  ) {
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

      const imagePath = 'src/img/food.jpg';

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

          message.reply({
            embeds: [
              { title: '점심 추천' },
              {
                image: {
                  url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fkor.pngtree.com%2Ffreepng%2Fspicy-cabbage-fried-rice-cake-food-illustration_6343892.html&psig=AOvVaw3t9Blo0kMdzQgrPZl8iv6u&ust=1725434103785000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjbqI2dpogDFQAAAAAdAAAAABAK',
                },
              },
              {
                thumbnail: {
                  url: 'http://blogfiles.naver.net/20151023_23/shin_0305_1445573936921jrPRT_JPEG/%BD%E6%B3%D7%C0%CF%BF%B9%BD%C3.jpg',
                },
              },
            ],
            content: `Restaurant list:\n${restaurantMessages}`,
            files: [imagePath],
          });
        }
      });
    } catch (err) {
      console.error('Failed to log in:', err);
    }
  }
}
