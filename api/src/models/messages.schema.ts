import * as AES from 'crypto-js/aes';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { Message } from 'src/types/message';

const saltRounds = 10;

export const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

MessageSchema.pre('save', async function (next) {
    const message = this as Message;
    message.content = AES.encrypt(message.content, process.env.KEY);
    next();
});
