import express from 'express';

import User from '../models/user';
import { getFundCompanyType, postFundCompanyType, putFundCompanyType, deleteFundCompanyType } from './fundCompanyType';
import { getFundCompany, postFundCompany, putFundCompany, deleteFundCompany } from './fundCompany';
import { postUnitTrustFund, putUnitTrustFund, deleteUnitTrustFund } from './unitTrustFund';

const router = express.Router();

router.get('/fundCompanyType', getFundCompanyType);
router.post('/fundCompanyType', postFundCompanyType);
router.put('/fundCompanyType', putFundCompanyType);
router.delete('/fundCompanyType', deleteFundCompanyType);

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

export default router;