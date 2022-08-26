import { Logger, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username: string = configService.get<string>(
          'MONGO_INITDB_ROOT_USERNAME',
        );
        const password: string = configService.get<string>(
          'MONGO_INITDB_ROOT_PASSWORD',
        );
        const hostname: string = configService.get<string>('MONGO_HOSTNAME');
        const database: string = configService.get<string>(
          'MONGO_INITDB_DATABASE',
        );
        return {
          uri: `mongodb://${username}:${password}@${hostname}:27017/${database}?authSource=admin`,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
