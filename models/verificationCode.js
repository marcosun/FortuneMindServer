import mongoose from 'mongoose';

import { isPhoneValidator } from './user';

const Schema = mongoose.Schema;

export const paths = ['phone', 'code'];

const VerificationCodeSchema = new Schema({
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: isPhoneValidator,
            msg: '手机号码格式不正确',
        },
    },
    code: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const VerificationCode = mongoose.model('VerificationCode', VerificationCodeSchema);

export default VerificationCode;