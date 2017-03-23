import express from 'express';

import User from '../models/user';
import { postUnitTrustFund, putUnitTrustFund } from './unitTrustFund';

const router = express.Router();

router.post('/unitTrustFund', postUnitTrustFund);

router.put('/unitTrustFund', putUnitTrustFund);

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