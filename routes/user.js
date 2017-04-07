import path from 'path';
import fs from 'fs';
import express from 'express';
import passport from 'passport';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

import upload from '../utils/upload';
import { isForbiddenViewingRebate, ensureAdmin, ensureUser } from '../utils/utils';

import User from '../models/user';
import { getUnitTrustFund, getUnitTrustFundById, getBriefUnitTrustFund, getBriefUnitTrustFundById } from './unitTrustFund';
import { getVerificationCode } from './verificationCode';

const router = express.Router();

/*
    1. these APIs will check for user privileges
    2. set rebate to null if user does not allowed to see the value
*/
router.get('/unitTrustFunds/brief', isForbiddenViewingRebate, getBriefUnitTrustFund);
router.get('/unitTrustFunds/brief/:id', isForbiddenViewingRebate, getBriefUnitTrustFundById);
router.get('/unitTrustFunds', isForbiddenViewingRebate, getUnitTrustFund);
router.get('/unitTrustFunds/:id', isForbiddenViewingRebate, getUnitTrustFundById);

router.get('/verificationCode', getVerificationCode);


/*
    accept
        mobile: Number
        password: String
    1. the must be only one admin account
    2. create user with roles of admin && financialPlanner
    3. automatic login
*/
router.post('/adminRegister', function(req, res, next) {
    
    User.find({ role: ['financialPlanner', 'admin'] }, (err, user) => {
        console.log(user);
        if (user.length !== 0) {
            return res.status(400).send({ error: '禁止再创建' });
        }
        
        User.register(new User({
            mobile: req.body.mobile,
            role: ['financialPlanner', 'admin'],
            isFinancialPlannerVerified: true,
        }), req.body.password, function(err, user) {

            if (err)
                return next();

            passport.authenticate('local')(req, res, (err) => {

                if (err)
                    return next();

                return res.status(201).send({
                    mobile: req.user.mobile,
                });
            });
        });
    });
    
});

//router.post('/register', function(req, res, next) {
//    
//    User.register(new User({
//        mobile: req.body.mobile,
//        namecard: req.body.namecard,
//        role: req.body.role,
//    }), req.body.password, function(err, user) {
//        if (err) {
//            res.status(401).send(err);
//            return next(err);
//        };
//        
//        return res.status(200).send({
//            msg: '注册成功',
//        });
//        
////        auto login after register
////        passport.authenticate('local')(req, res, function () {
////            res.status(200).send({
////                msg: '登录成功',
////            });
////        });
//    });
//    
//});

router.post('/login', passport.authenticate('local'), function(req, res) {
    return res.status(201).send({
        msg: '登录成功',
        mobile: req.user.mobile,
        role: req.user.role,
        isFinancialPlannerVerified: req.user.isFinancialPlannerVerified,
    });
});

router.get('/login', ensureUser, function(req, res) {
    res.status(200).send({
        msg: '登录成功',
        mobile: req.user.mobile,
        role: req.user.role,
        isFinancialPlannerVerified: req.user.isFinancialPlannerVerified,
    });
});

router.get('/adminLogin', ensureAdmin, function(req, res) {
    res.status(200).send({
        msg: '登录成功',
        mobile: req.user.mobile,
        role: req.user.role,
        isFinancialPlannerVerified: req.user.isFinancialPlannerVerified,
    });
});

router.post('/logout', function(req, res) {
    
    req.logout();
    res.status(201).send({
        msg: '登出成功',
    });
    
});

//router.post('/upload', upload.single('namecard'), (req, res) => {
//    
//    //minify image to upload folder
//    imagemin([req.file.path], path.join(req.file.path, '../../upload'), {
//        use: [
//            imageminMozjpeg({
//                quality: 80,
//            })
//        ],
//    }).then((files) => {
//        
//        //delete original uploaded file
//        fs.unlink(req.file.path, (err) => {
//            
//        });
//        
//        res.status(200).send({
//            path: files[0].path,
//            msg: '上传成功',
//        });
//    });
//    
//});

export default router;