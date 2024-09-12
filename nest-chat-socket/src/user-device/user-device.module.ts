import { Module } from '@nestjs/common';
import { UserDeviceController } from './user-device.controller';
import { UserDeviceService } from './user-device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDevice } from './user-device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDevice])],
  controllers: [UserDeviceController],
  providers: [UserDeviceService],
})
export class UserDeviceModule {}
