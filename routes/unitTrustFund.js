import mongoose from 'mongoose';
import { filterObjectWithKeys } from '../utils/utils';

import UnitTrustFund, { paths } from '../models/unitTrustFund';

export function getUnitTrustFund (req, res, next) {
    
    UnitTrustFund.find()
        .select('-updatedAt -createdAt -__v')
        .populate({
            path: 'issuer',
            select: '-updatedAt -createdAt -__v',
            populate: {
                path: 'type',
                select: '-updatedAt -createdAt -__v',
            },
        })
        .exec((err, unitTrustFunds) => {
            
            if (err) {
                return next();
            };
            
            return res.status(200).send(unitTrustFunds);
            
        });
    
};

export function getUnitTrustFundById (req, res, next) {
    
    UnitTrustFund.findById(req.params.id)
        .select('-updatedAt -createdAt -__v')
        .populate({
            path: 'issuer',
            select: '-updatedAt -createdAt -__v',
            populate: {
                path: 'type',
                select: '-updatedAt -createdAt -__v',
            },
        })
        .exec((err, unitTrustFund) => {
            
            if (err) {
                return next();
            };
            
            return res.status(200).send(unitTrustFund);
            
        });
    
};

export function getBriefUnitTrustFund (req, res, next) {
    
    UnitTrustFund.find()
        .select('name issuer salesDate term investIndustry progress sizeStructure salesPolicies investProvince investCity')
        .populate({
            path: 'issuer',
            select: '-updatedAt -createdAt -__v',
        })
        .exec((err, unitTrustFund) => {
            
            //throw error if err or doc does not exist
            if (err) {
                return next();
            };
            
            return res.status(200).send(unitTrustFund);
            
        });
    
};

export function getBriefUnitTrustFundById (req, res, next) {
    
    UnitTrustFund.findById(req.params.id)
        .select('name issuer salesDate term investIndustry progress sizeStructure salesPolicies investProvince investCity')
        .populate({
            path: 'issuer',
            select: '-updatedAt -createdAt -__v',
        })
        .exec((err, unitTrustFund) => {
            
            //throw error if err or doc does not exist
            if (err) {
                return next();
            };
            
            return res.status(200).send(unitTrustFund);
            
        });
    
};

export function postUnitTrustFund (req, res, next) {
    
    const newUnitTrustFund = filterObjectWithKeys(req.body, paths);
    
    if (newUnitTrustFund.issuer) {
        newUnitTrustFund.issuer = mongoose.Types.ObjectId(newUnitTrustFund.issuer);
    }
    
    UnitTrustFund.create(newUnitTrustFund, (err, unitTrustFund) => {

        if (err) {

            switch (err.code) {
                case 11000:
                    return res.status(400).send({error: '基金已经存在'});
                    break;
                default:
                    return next();
            }
        }

        return res.status(201).send(unitTrustFund);

    });
    
};

export function putUnitTrustFund (req, res, next) {
    
    const newUnitTrustFund = filterObjectWithKeys(req.body, paths);
    
    if (newUnitTrustFund.issuer) {
        newUnitTrustFund.issuer = mongoose.Types.ObjectId(newUnitTrustFund.issuer);
    }
    
    UnitTrustFund.findByIdAndUpdate(req.body._id, newUnitTrustFund)
        .exec((err, unitTrustFund) => {
            
            if (err) {
                return next();
            }

            if (unitTrustFund) {
                return res.status(201).send(unitTrustFund);
            } else {
                return res.status(400).send({error: '基金不存在'});
            }
        });
    
};

export function deleteUnitTrustFund (req, res, next) {
    
    UnitTrustFund.findByIdAndRemove(req.body._id)
        .exec((err, unitTrustFund) => {

            if (err) {
                return next();
            }

            if (unitTrustFund) {
                return res.status(201).send();
            } else {
                return res.status(400).send({error: '基金不存在'});
            }

        });
    
};