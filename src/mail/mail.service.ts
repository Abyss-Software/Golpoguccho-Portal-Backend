const Brevo = require('@getbrevo/brevo');

import { Injectable } from '@nestjs/common';
import { errorhandler, successHandler } from 'src/utils/response.handler';

@Injectable()
export class EmailService {
  brevo: any;

  constructor() {
    this.brevo = Brevo.ApiClient.instance;
    const apiKey = this.brevo.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
  }

  async sendEventAssignMail(emailConfig: IAssignMailProps) {
    const tranEmailApi = new Brevo.TransactionalEmailsApi();
    const sender = {
      email: 'support@golpogucchophotography.com',
      name: 'GolpoGuccho Photography',
    };

    const receivers = [
      {
        email: emailConfig.email,
      },
    ];

    try {
      await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        templateId: 1,
        params: {
          eventTitle: emailConfig.eventTitle,
          venue: emailConfig.venue,
          location: emailConfig.location,
          eventDate: emailConfig.eventDate,
          startTime: emailConfig.startTime,
        },
      });

      return successHandler('TestMail Sent Successfully', {});
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }
}

interface IAssignMailProps {
  email: string;
  eventTitle: string;
  venue: string;
  location: string;
  eventDate: string;
  startTime: string;
}
