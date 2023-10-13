import { Injectable } from '@nestjs/common';
import { errorhandler, successHandler } from 'src/utils/response.handler';

// import { Injectable } from '@nestjs/common';
// import { errorhandler, successHandler } from 'src/utils/response.handler';

// @Injectable()
// export class EmailService {
//   brevo: any;

//   constructor() {
//     this.brevo = Brevo.ApiClient.instance;
//     const apiKey = this.brevo.authentications['api-key'];
//     apiKey.apiKey = process.env.BREVO_API_KEY;
//   }

//   async sendEventAssignMail(emailConfig: IAssignMailProps) {
//     const tranEmailApi = new Brevo.TransactionalEmailsApi();
//     const sender = {
//       email: 'support@golpogucchophotography.com',
//       name: 'GolpoGuccho Photography',
//     };

//     const receivers = [
//       {
//         email: emailConfig.email,
//       },
//     ];

//     try {
//       await tranEmailApi.sendTransacEmail({
//         sender,
//         to: receivers,
//         templateId: 1,
//         params: {
//           eventTitle: emailConfig.eventTitle,
//           venue: emailConfig.venue,
//           location: emailConfig.location,
//           eventDate: emailConfig.eventDate,
//           startTime: emailConfig.startTime,
//         },
//       });

//       return successHandler('TestMail Sent Successfully', {});
//     } catch (error) {
//       return errorhandler(400, JSON.stringify(error.message));
//     }
//   }

//   async sendNewBookingEmail(emailConfig: INewBookingMailProps) {
//     const tranEmailApi = new Brevo.TransactionalEmailsApi();
//     const sender = {
//       email: 'support@golpogucchophotography.com',
//       name: 'GolpoGuccho Photography',
//     };

//     const receivers = [
//       {
//         email: emailConfig.email,
//       },
//     ];

//     try {
//       await tranEmailApi.sendTransacEmail({
//         sender,
//         to: receivers,
//         templateId: 1,
//         params: {
//           bookingTitle: emailConfig.bookingTitle,
//           clientName: emailConfig.clientName,
//           eventCount: emailConfig.eventCount,
//           contactPrimary: emailConfig.contactPrimary,
//           contactSecondary: emailConfig.contactSecondary,
//           bookingDate: emailConfig.bookingDate,
//           advancePayment: emailConfig.advancePayment,
//           advancePaymentMethod: emailConfig.advancePaymentMethod,
//           advanceTransactionId: emailConfig.advanceTransactionId,
//         },
//       });

//       return successHandler('TestMail Sent Successfully', {});
//     } catch (error) {
//       return errorhandler(400, JSON.stringify(error.message));
//     }
//   }

//   async sendDuePaymentEMail(emailConfig: IDuePaymentMailProps) {
//     const tranEmailApi = new Brevo.TransactionalEmailsApi();
//     const sender = {
//       email: 'support@golpogucchophotography.com',
//       name: 'GolpoGuccho Photography',
//     };

//     const receivers = [
//       {
//         email: emailConfig.email,
//       },
//     ];

//     try {
//       await tranEmailApi.sendTransacEmail({
//         sender,
//         to: receivers,
//         templateId: 1,
//         params: {
//           bookingTitle: emailConfig.bookingTitle,
//           clientName: emailConfig.clientName,
//           eventCount: emailConfig.eventCount,
//           contactPrimary: emailConfig.contactPrimary,
//           contactSecondary: emailConfig.contactSecondary,
//           bookingDate: emailConfig.bookingDate,
//           duePayment: emailConfig.duePayment,
//           duePaymentMethod: emailConfig.duePaymentMethod,
//           dueTransactionId: emailConfig.dueTransactionId,
//         },
//       });

//       return successHandler('TestMail Sent Successfully', {});
//     } catch (error) {
//       return errorhandler(400, JSON.stringify(error.message));
//     }
//   }
// }

const Brevo = require('@getbrevo/brevo');
const TransactionalEmailsApi = Brevo.TransactionalEmailsApi;

@Injectable()
export class EmailService {
  private readonly brevo: any;

  constructor() {
    this.brevo = Brevo.ApiClient.instance;
    this.brevo.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
  }

  private async sendEmail(emailConfig: any, templateId: number) {
    const tranEmailApi = new TransactionalEmailsApi();
    const sender = {
      email: 'support@golpogucchophotography.com',
      name: 'GolpoGuccho Photography',
    };

    const receivers = [{ email: emailConfig.email }];

    console.log('emailConfig', emailConfig, receivers);
    try {
      await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        templateId,
        params: emailConfig,
      });

      return successHandler('Email Sent Successfully', {});
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  //email to assigned employees
  async sendEventAssignMail(emailConfig: IAssignMailProps) {
    const templateId = 1;
    return this.sendEmail(emailConfig, templateId);
  }

  //email to admin and mods about new booking
  async sendNewBookingEmail(emailConfig: INewBookingMailProps) {
    const templateId = 2;
    return this.sendEmail(emailConfig, templateId);
  }

  //email to admin and mods about client making due payment
  async sendDuePaymentEmail(emailConfig: IDuePaymentMailProps) {
    const templateId = 3;
    return this.sendEmail(emailConfig, templateId);
  }

  //email to client about booking confirmation
  async sendBookingConfirmEmail(emailConfig: IBookingConfirmMailProps) {
    const templateId = 4;
    return this.sendEmail(emailConfig, templateId);
  }

  //email to client about booking completion
  async sendBookingCompleteEmail(emailConfig: IBookingCompleteMailProps) {
    const templateId = 5;
    return this.sendEmail(emailConfig, templateId);
  }

  //email to client about soft copy ready for download
  async sendCompletePaymentEmail(emailConfig: ICompletePaymentMailProps) {
    const templateId = 6;
    return this.sendEmail(emailConfig, templateId);
  }
}

export interface IAssignMailProps {
  email: string;
  eventTitle: string;
  venue: string;
  location: string;
  eventDate: string;
  startTime: string;
}

export interface INewBookingMailProps {
  email: string;
  bookingTitle: string;
  clientName: string;
  eventCount: number;
  packages: string;
  contactPrimary: string;
  contactSecondary: string;
  bookingDate: string;
  advancePayment: number;
  advancePaymentMethod: string;
  advanceTransactionId: string;
}

export interface IDuePaymentMailProps {
  email: string;
  bookingTitle: string;
  clientName: string;
  eventCount: number;
  contactPrimary: string;
  contactSecondary: string;
  bookingDate: string;
  duePayment: number;
  duePaymentMethod: string;
  dueTransactionId: string;
}

export interface IBookingConfirmMailProps {
  email: string;
  bookingTitle: string;
  clientName: string;
  eventCount: number;
  eventDates: string;
  packages: string;
  totalPayment: number;
  advancePayment: number;
  advancePaymentMethod: string;
  advancePaymentInfo: string;
}

export interface IBookingCompleteMailProps {
  email: string;
  totalPayment: number;
  duePayment: number;
  duePaymentMethod: string;
  duePaymentInfo: string;
}

export interface ICompletePaymentMailProps {
  email: string;
  bookingTitle: string;
  totalPayment: number;
  advancePayment: number;
  duePayment: number;
}
