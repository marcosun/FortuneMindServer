import mongoose from 'mongoose';

import VerificationCodeModel, { paths } from '../models/verificationCode';

/*
    accept phone [Number]
    
    return
        success:
            { msg: '验证码发送成功' }
        error:
            { error: '请求过于频繁' }
    
    1. accept phone number
    2. create 6 digit verification code by calling method Math.random 6 times
    3. find by phone number
    4. check if document exists, if record exists goes to step 5, if record does not exist goes to step 7
    5 (document exists) compare timestamp, if less than 60 seconds, return { error: '请求过于频繁' }
    6 (document exists) compare timestamp, if longer than 60 seconds, goes to step 8
    7 (document does not exist) create document, goes to step 9
    8 update document, goes to step 9
    9 call SMS service api
    10 if succeeded, return { msg: '验证码发送成功' }
    11 if failed, return { error: '请求过于频繁' }
*/
const smsCodeService = (res, next) => {
    res.status(200).send({ msg: '验证码发送成功' }) ;
};

export const getVerificationCode = (req, res, next) => {
    
    const phone = req.query.phone;
    
    let code = '';
    [0,1,2,3,4,5].forEach(() => {
        const oneDigit = (Math.random()*10).toString().substring(0,1);
        code = code.concat(oneDigit);
    });
    
    VerificationCodeModel.findOne({ phone })
        .exec((err, verificationCode) => {
            if (err) {
                return next();
            }
            
            if (verificationCode) {
                if (Date.now() - verificationCode.updatedAt <= 1000 * 60) {
                    
                    return res.status(400).send({ error: '请求过于频繁' });
                    
                } else {
                    
                    verificationCode.code = code;
                    verificationCode.save((err) => {
                        if (err) {
                            return next();
                        }
                        
                        return smsCodeService(res, next);
                    });
                    
                }
                
            } else {
                
                VerificationCodeModel.create({ phone, code }, (err) => {
                    if (err) {
                        return next();
                    }

                    return smsCodeService(res, next);
                });
            }
        })
};