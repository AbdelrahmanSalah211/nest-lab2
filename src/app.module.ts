import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticateMiddleware } from './middlewares/authenticate.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      // imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => {
        const uri = ConfigService.getOrThrow<string>('MONGO_DB_URI');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: '/auth/signup', method: RequestMethod.POST },
        { path: 'auth/signin', method: RequestMethod.POST },
      )
      .forRoutes('/');
  }
}
