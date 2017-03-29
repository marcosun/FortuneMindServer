import express from 'express';

import upload from '../utils/upload';

import User from '../models/user';
import { getFundCompanyType, getFundCompanyTypeById, postFundCompanyType, putFundCompanyType, deleteFundCompanyType } from './fundCompanyType';
import { getFundCompany, postFundCompany, putFundCompany, deleteFundCompany } from './fundCompany';
import { postUnitTrustFund, putUnitTrustFund, deleteUnitTrustFund } from './unitTrustFund';

const router = express.Router();

router.get('/fundCompanyTypes', getFundCompanyType);
router.get('/fundCompanyTypes/:id', getFundCompanyTypeById);
router.post('/fundCompanyTypes', postFundCompanyType);
router.put('/fundCompanyTypes', putFundCompanyType);
router.delete('/fundCompanyTypes', deleteFundCompanyType);

router.get('/fundCompany', getFundCompany);
router.post('/fundCompany', postFundCompany);
router.put('/fundCompany', putFundCompany);
router.delete('/fundCompany', deleteFundCompany);

router.post('/unitTrustFund', postUnitTrustFund);
router.put('/unitTrustFund', putUnitTrustFund);
router.delete('/unitTrustFund', deleteUnitTrustFund);

router.post('/user/verifyFinancialPlanner', (req, res, next) => {
    User.findByUsername(req.body.mobile)
        .then((user) => {
            console.log(user);
            user.isFinancialPlannerVerified = false;
            user.save(() => {
                res.status(200).send({user});
            });
        })
});

router.post('/upload', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        
        if (err) {
            res.status(403).send({errMsg: '图片类型不正确'});
            return next(err);
        }
        
        res.status(200).send({
            path: req.file.path,
            msg: '上传成功',
        });
    });
});

export default router;