import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CountrysModule } from './countrys/countrys.module';
import { DistributionsModule } from './distributions/distributions.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/api'),
    AuthModule,
    ConfigModule.forRoot({ ignoreEnvFile: false, isGlobal: true }),
    CountrysModule,
    DistributionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
