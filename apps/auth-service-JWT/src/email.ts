import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);




export async function sendEmail({ to, URL_RESET_PASSWORD }: { to: string, URL_RESET_PASSWORD: string }) {
  try {
    return await resend.emails.send({
      from: 'Echoo_no-reply@resend.dev',
      to,
      template: {
        id: 'test-init-mdp', //c'est l'id du template crée sur resend
        variables: {
          URL_RESET_PASSWORD
        }
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

