import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

@Controller()
export class BookingsConsumerController {
  @EventPattern('booked')
  async onBooked() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'keshawn.schaefer80@ethereal.email',
        pass: 'cs5PqztZXzS48K45hY',
      },
    });

    await transporter.verify();

    transporter.sendMail({
      from: 'keshawn.schaefer80@ethereal.email',
      to: 'andrewprog97@gmail.com',
      subject: 'Booked tickets',
      html: '<b>Hello!!!</b> here are your tickets',
    });
    Logger.log('EMAIL SENT!!!');
  }
}
