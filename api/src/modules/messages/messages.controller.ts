import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as CryptoJS from 'crypto-js';
import 'dotenv/config';
import { AuthService } from '../auth/auth.service';
import { MessageDto } from './message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(
        private authService: AuthService,
        private messagesService: MessagesService,
    ) { }

    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() messageDto: MessageDto) {
        try {
            return await this.messagesService.create(messageDto);
        } catch (error) {
            return error;
        }
    }

    @Get()
    @UseGuards(AuthGuard())
    async findAll() {
        return (await this.messagesService.find()).map(
            message => {
                const bytes = CryptoJS.AES.decrypt(message.content.toString(), process.env.KEY);
                message.content = bytes.toString(CryptoJS.enc.Utf8);
                return message;
            },
        );
    }

}
