import mongoose from 'mongoose';

import UnitTrustFund, { paths } from '../models/unitTrustFund';

export function getUnitTrustFundDeatil (req, res, next) {
    
    UnitTrustFund.findById(req.query._id)
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
                res.status(500).send(err);
                return next();
            };

            return res.status(200).send(unitTrustFund);

        });
    
};

export function getUnitTrustFundDescription (req, res, next) {
    
    UnitTrustFund.find({})
        .select('name salesDate term investIndustry progress sizeStructure salesPolicies investProvince investCity')
        .exec((err, unitTrustFund) => {
        
            //throw error if err or doc does not exist
            if (err) {
                res.status(500).send(err);
                return next();
            };

            return res.status(200).send(unitTrustFund);
        
        });
    
};

export function postUnitTrustFund (req, res, next) {
    
    let unitTrustFund = {};
    
    for (let path of paths) {

        if (req.body[path] !== undefined) {
            unitTrustFund[path] = req.body[path];
        }
    }
    
    if (unitTrustFund.issuer) {
        unitTrustFund.issuer = mongoose.Types.ObjectId(unitTrustFund.issuer);
    }
    
    if (unitTrustFund.salesPolicies) {
        unitTrustFund.salesPolicies = JSON.parse(unitTrustFund.salesPolicies);
    }
    
    UnitTrustFund.create(unitTrustFund, (err) => {

        if (err) {

            switch (err.code) {
                case 11000:
                    res.status(403).send({errMsg: '基金已经存在'});
                    break;
                default:
                    res.status(500).send(err);
            }

            return next();
        }

        return res.status(200).send({msg: '创建成功'});

    });
    
};

export function putUnitTrustFund (req, res, next) {
    
    let updateUnitTrustFund = {};
    
    for (let path of paths) {

        if (req.body[path] !== undefined) {
            updateUnitTrustFund[path] = req.body[path];
        }
    }
    
    if (updateUnitTrustFund.issuer) {
        updateUnitTrustFund.issuer = mongoose.Types.ObjectId(updateUnitTrustFund.issuer);
    }
    
    if (updateUnitTrustFund.salesPolicies) {
        updateUnitTrustFund.salesPolicies = JSON.parse(updateUnitTrustFund.salesPolicies);
    }
    
    UnitTrustFund.findByIdAndUpdate(req.body._id, updateUnitTrustFund)
        .exec((err, unitTrustFund) => {
            if (err) {
                res.status(403).send(err);
                return next();
            }

            if (unitTrustFund) {
                return res.status(200).send({msg: '更新成功'});
            } else {
                res.status(403).send({errMsg: '基金不存在'});
                return next();
            }
        });
    
};

export function deleteUnitTrustFund (req, res, next) {
    
    UnitTrustFund.findByIdAndRemove(req.body._id)
        .exec((err, unitTrustFund) => {

        if (err) {
            res.status(403).send(err);
            return next();
        }

        if (unitTrustFund) {
            return res.status(200).send({msg: '删除成功'});
        } else {
            res.status(403).send({errMsg: '基金不存在'});
            return next();
        }

    });
    
};