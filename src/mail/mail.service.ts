import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
const Mailjet = require('node-mailjet');
const Brevo = require('@getbrevo/brevo');

@Injectable()
export class MailService {
  private mailjet: any;
  mailerSend: MailerSend;
  brevo: any;

  constructor() {
    this.mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_SECRET_KEY,
    });
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });
    this.brevo = Brevo.ApiClient.instance;
  }

  async sendBookingConfirmation(email: string, bookingDetails: any) {
    const request = this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'support@golpogucchophotography.com',
            Name: 'Golpoguccho Photography',
          },
          To: [
            {
              Email: email,
              Name: 'passenger 1',
            },
          ],
          Subject: 'Your email flight plan!',
          TextPart:
            'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
          HTMLPart:
            '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        },
      ],
    });

    console.log(request);
    request
      .then((result) => {
        console.log(result);
        console.log(result.body);
      })
      .catch((err) => {
        console.log('err', err);
        console.log(err.statusCode);
      });
  }

  async sendBookingConfirmationMailerSend(email: string, bookingDetails: any) {
    const sentFrom = new Sender(
      'support@golpogucchophotography.com',
      'Golpoguccho Support',
    );

    const recipients = [new Recipient(email, 'Client Mr')];

    const personalization = [
      {
        email: email,
        data: {
          name: 'Client Mr',
          account_name: 'Rando',
        },
      },
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject('This is a test Mail from MailerSend')
      .setTemplateId('neqvygmrw65l0p7w')
      .setPersonalization(personalization);

    const mailSending = await this.mailerSend.email
      .send(emailParams)
      .then((result) => {
        console.log(result);
        console.log(result.body);
      })
      .catch((err) => {
        console.log('err', err);
        console.log(err.statusCode);
      });

    console.log(mailSending);
  }
}
