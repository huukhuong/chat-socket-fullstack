import { UserDevice } from './../user-device/user-device.entity';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import BaseException from 'src/utils/base-exception';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UserDevice)
    private readonly userDeviceRepository: Repository<UserDevice>,
  ) {}

  async sendNotificationMobile(props: CreateNotificationDto) {
    const { title, data, message, userId } = props;
    const appId = process.env.ONESIGNAL_APP_ID;
    const apiKey = process.env.ONESIGNAL_REST_API_KEY;

    const devicesMappingUser = await this.userDeviceRepository.find({
      where: { userId },
    });

    const deviceIds = devicesMappingUser
      .map((e) => e.deviceId)
      .filter((e) => e && e);

    const body = {
      app_id: appId,
      include_aliases: {
        external_id: deviceIds,
      },
      target_channel: 'push',
      data,
      headings: {
        en: title,
      },
      contents: {
        en: message,
      },
    };

    try {
      const result = await axios.post(
        'https://onesignal.com/api/v1/notifications',
        body,
        {
          headers: {
            Authorization: `Basic ${apiKey}`,
          },
        },
      );

      return result.data;
    } catch (error) {
      throw new BaseException({ statusCode: 500, message: error.message });
    }
  }
}
