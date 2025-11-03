import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

const mongooseFactory = (configService: ConfigService) => ({
  uri: configService.get<string>('MONGODB_URI'),
  dbName: configService.get<string>('MONGODB_NAME'),
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseFactory
    }),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
})

export class AppModule {}
