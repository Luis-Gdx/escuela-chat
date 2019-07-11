import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/types/message';
import { MessageDto } from './message.dto';

@Injectable()
export class MessagesService {

    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) { }

    create(messageDto: MessageDto): Promise<Message> {
        return new this.messageModel(messageDto).save();
    }

    find(): Promise<Message[]> {
        return this.messageModel.find({}).populate('user').sort('createdAt').exec();
    }
}
