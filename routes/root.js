import express from 'express';

const router = express.Router();

import { getUnitTrustFundDeatil, getUnitTrustFundDescription } from './unitTrustFund';

router.get('/unitTrustFundDeatil', getUnitTrustFundDeatil);

router.get('/unitTrustFundDescription', getUnitTrustFundDescription);

export default router;