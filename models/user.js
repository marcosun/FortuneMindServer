import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

export const isPhoneValidator = (value) => {
    return /^1(3|5|8)\d{9}$/.test(value);
};

const options = {
    usernameField: 'mobile',
    limitAttempts: true,
    maxAttempts: 5,
    errorMessages: {
        MissingPasswordError: '密码不能为空',
        AttemptTooSoonError: '账户已被锁定，请稍后再试',
        TooManyAttemptsError: '登录失败次数过多，账户已被锁定',
        IncorrectPasswordError: '手机号或密码不正确',
        IncorrectUsernameError: '手机号或密码不正确',
        MissingUsernameError: '用户名不得为空',
        UserExistsError: '手机号已存在',
    }
};

const UserSchema = new Schema({
    mobile: {
        type: Number,
        required: true, 
        unique: true,
        validate: {
            validator: isPhoneValidator,
            msg: '手机号码格式不正确',
        },
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    namecard: {
        type: String,
    },
    role: {
        type: [],
        required: true,
        //['financialPlanner', 'customer', 'admin'],
        default: ['customer'],
    },
    isFinancialPlannerVerified: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
}, {
    timestamps: true,
});

UserSchema.plugin(passportLocalMongoose, options);

const User = mongoose.model('User', UserSchema);

export default User;