import nodemailer from 'nodemailer';
import { Interface } from 'readline';

interface ISendEmailPayload {
  from?: string;
  to: string;
  subject: string;
  text: string;
}
class MailProvider {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'raquel3@ethereal.email',
        pass: 'RwRR8xMfCx7jEnQJdR'
      }
    });
  }

  public async sendMail({ from = 'admin@gmail.com', to, subject, text }: ISendEmailPayload) {
    try {
      return this.transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html: text // plain text body
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}

export const mailProvider = new MailProvider();
