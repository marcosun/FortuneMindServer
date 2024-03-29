import express from 'express';

import upload from '../utils/upload';

import User from '../models/user';
import { getFundCompanyType, getFundCompanyTypeById, postFundCompanyType, putFundCompanyType, deleteFundCompanyType } from './fundCompanyType';
import { getFundCompany, getFundCompanyById, postFundCompany, putFundCompany, deleteFundCompany } from './fundCompany';
import { getUnitTrustFund, getUnitTrustFundById, getBriefUnitTrustFund, getBriefUnitTrustFundById, postUnitTrustFund, putUnitTrustFund, deleteUnitTrustFund } from './unitTrustFund';

const router = express.Router();

router.get('/fundCompanyTypes', getFundCompanyType);
router.get('/fundCompanyTypes/:id', getFundCompanyTypeById);
router.post('/fundCompanyTypes', postFundCompanyType);
router.put('/fundCompanyTypes', putFundCompanyType);
router.delete('/fundCompanyTypes', deleteFundCompanyType);

router.get('/fundCompanies', getFundCompany);
router.get('/fundCompanies/:id', getFundCompanyById);
router.post('/fundCompanies', postFundCompany);
router.put('/fundCompanies', putFundCompany);
router.delete('/fundCompanies', deleteFundCompany);

router.get('/unitTrustFunds/brief', getBriefUnitTrustFund);
router.get('/unitTrustFunds/brief/:id', getBriefUnitTrustFundById);
router.get('/unitTrustFunds', getUnitTrustFund);
router.get('/unitTrustFunds/:id', getUnitTrustFundById);
router.post('/unitTrustFunds', postUnitTrustFund);
router.put('/unitTrustFunds', putUnitTrustFund);
router.delete('/unitTrustFunds', deleteUnitTrustFund);

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