const Brevo = require('@getbrevo/brevo');
import { errorhandler, successHandler } from '../response.handler';

const client = Brevo.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new Brevo.TransactionalEmailsApi();
const sender = {
  email: 'support@golpogucchophotography.com',
  name: 'GolpoGuccho Photography',
};

export const sendMailTest = async (emailConfig: any) => {
  const receivers = [
    {
      email: emailConfig.email,
    },
  ];

  try {
    const sending = await tranEmailApi
      .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Test email from Brevo',
        htmlContent: '<h1>This is a test email from Brevo</h1>',
        params: {
          role: 'Frontend',
        },
      })
      .then((result) => {
        console.log(result);
        console.log(result.body);
      })
      .catch((err) => {
        console.log('err', err);
        console.log(err.statusCode);
      });
    console.log(sending);
    return successHandler('TestMail Sent Successfully', {});
  } catch (error) {
    return errorhandler(400, JSON.stringify(error.message));
  }
};
