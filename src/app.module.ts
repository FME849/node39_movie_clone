import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './utils/jwt';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS256',
      },
    }),
  ],
})
export class AppModule {}
