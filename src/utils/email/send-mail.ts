//used send in blue
// @ts-ignore
import * as Sib from 'sib-api-v3-sdk';
import { errorhandler, successHandler } from '../response.handler';

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey =
  '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';

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: '',
  name: 'GolpoGuccho Photography',
};

export const sendMailTest = async (emailConfig: any) => {
  const receivers = [
    {
      email: emailConfig.receiver,
    },
  ];

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: emailConfig.subject,
      textContent: emailConfig.textContent,
      htmlContent: emailConfig.htmlContent,
      params: {
        role: 'Frontend',
      },
    });
    return successHandler(
      {},
      'A password reset email sent to given email address',
    );
  } catch (error) {
    return errorhandler(400, JSON.stringify(error.message));
  }
};
