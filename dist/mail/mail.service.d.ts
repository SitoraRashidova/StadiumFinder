import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/models/user.model';
export declare class MailService {
    private mailerSercice;
    constructor(mailerSercice: MailerService);
    sendMail(user: User): any;
}
