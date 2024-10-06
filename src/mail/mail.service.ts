import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { log } from 'console';

@Injectable()
export class MailService {
    constructor(
        private mailerSercice:MailerService
    ){}

    async sendMail(user:User){
        //url taxlab olamiz
        const url=`${process.env.API_URL}:${process.env.PORT}/api/users/activate/${user.activation_link}`
        log(url)
        await this.mailerSercice.sendMail({
            to:user.email,
            subject:"Stadium appga xush kelibsiz",
            template:'./confirm',
            context:{
                full_name:user.full_name,
                url
            }
        })
    }
}
