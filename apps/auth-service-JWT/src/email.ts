import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);




export async function sendEmail({ to, URL_RESET_PASSWORD ="", URL_VERIFICATION = "" }: { to: string, URL_RESET_PASSWORD?: string, URL_VERIFICATION?: string }) {
  
  let urlUse = URL_RESET_PASSWORD ? URL_RESET_PASSWORD : URL_VERIFICATION;
  let templateId = URL_RESET_PASSWORD ? 'reset-mdp' : 'confirme-mail';
  try {
    return await resend.emails.send({
      from: 'Echoo_no-reply@resend.dev',
      to,
      template: {
        id: templateId, //c'est l'id du template crée sur resend
        variables: {
          URL_REDIRECTION: urlUse,
        }
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

