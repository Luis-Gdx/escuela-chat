import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { User } from 'src/types/user';

const saltRounds = 10;

export const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    roles: {
        type: [String],
        required: true,
        default: ['user'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

UserSchema.pre('save', async function (next) {
    const user = this as User;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    user.email = user.email.toLowerCase();
    // user.userName = user.userName.toLowerCase();
    next();
});

UserSchema.methods.verifyPassword = async function (password) {
    const hash = this.password;
    return await bcrypt.compare(password, hash);
};
