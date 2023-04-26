import { IMailProvider, IMessage } from "./IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";
import dotenv from "dotenv";
dotenv.config();

export class AWSMailer implements IMailProvider {
    private transporter: Mail;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.AWS_SMTP,
            port: 25 || 465,
            auth: {
                user: process.env.AWS_SMTP_USER,
                pass: process.env.AWS_SMTP_PASSWORD
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        })
    }
}