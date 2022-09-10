import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';

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
    HealthModule,
  ],
})
export class AppModule {}
