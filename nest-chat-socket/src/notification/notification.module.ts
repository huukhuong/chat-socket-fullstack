import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDevice } from 'src/user-device/user-device.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserDevice])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
