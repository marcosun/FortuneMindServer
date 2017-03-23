import path from 'path';
import fs from 'fs';
import express from 'express';
import passport from 'passport';
import multer from 'multer';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

import User from '../models/user';

const router = express.Router();

const upload = multer({
    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'tmp/tmp');
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.random().toString(36).substring(2)}-${Date.now()}.jpg`);
        },
    }),
    
    fileFilter: (req, file, cb) => {
        //accept jpeg only
        if (file.mimetype !== 'image/jpeg') {
            return cb(null, false);
        }
        
        cb(null, true);
    },
    
    limits: {
        fields: 0,
        fileSize: 1048576,//1M
        files: 1,
    },
});

router.post('/register', function(req, res, next) {
    
    User.register(new User({
        mobile: req.body.mobile,
        namecard: req.body.namecard,
        role: req.body.role,
    }), req.body.password, function(err, user) {
        if (err) {
            res.status(401).send(err);
            return next(err);
        };
        
        return res.status(200).send({
            msg: '注册成功',
        });
        
//        auto login after register
//        passport.authenticate('local')(req, res, function () {
//            res.status(200).send({
//                msg: '登录成功',
//            });
//        });
    });
    
});

router.post('/login', function(req, res, next) {
    
    User.authenticate()(req.body.mobile, req.body.password, function(err, user, options) {
        
        if (err) {
            
            res.status(401).send(err);
                
            return next(err)
        
        };
        
        if (!user) {
            return res.status(401).send({
                msg: '手机号或密码不正确',
            });
        }
        
        req.login(user, (err) => {
            
            if (err) {

                res.status(401).send(err);

                return next(err)

            };
            
            res.status(200).send({
                msg: '登录成功',
                user,
            });
        });
        
    });
});

router.get('/login', (req, res) => {
    
    console.log(req.user);
    
    if (req.user) {
        return res.status(200).send({
            msg: '登录状态：已登录',
            user: req.user,
        });
    }
    
    return res.status(401).send({
        msg: '登录状态：未登录',
    });
    
});

router.get('/logout', function(req, res) {
    
    req.logout();
    res.status(200).send({
        msg: '登出成功',
    });
    
});

router.post('/upload', upload.single('namecard'), (req, res) => {
    
    //minify image to upload folder
    imagemin([req.file.path], path.join(req.file.path, '../../upload'), {
        use: [
            imageminMozjpeg({
                quality: 80,
            })
        ],
    }).then((files) => {
        
        //delete original uploaded file
        fs.unlinkSync(req.file.path);
        
        res.status(200).send({
            path: files[0].path,
            msg: '上传成功',
        });
    });
    
});

export default router;