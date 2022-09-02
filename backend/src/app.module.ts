import { Logger, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    // Basic security again
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    // Global modules
    ConfigModule.forRoot({
      ignoreEnvFile: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),

    // App Modules
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
