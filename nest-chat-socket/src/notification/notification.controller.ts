import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from './create-notification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Public } from 'src/utils/decorators';

@ApiTags('Notification')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-mobile')
  @Public()
  sendNotificationMobile(@Body() notification: CreateNotificationDto) {
    return this.notificationService.sendNotificationMobile(notification);
  }
}
