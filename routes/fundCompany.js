import mongoose from 'mongoose';

import FundCompanyModel, { paths } from '../models/fundCompany';

export function getFundCompany (req, res, next) {
    
    FundCompanyModel.find()
        .select('name type logo')
        .populate('type', 'name -_id')
        .exec((err, fundCompanies) => {
        
            if (err) {
                res.status(500).send(err);
                return next();
            }

            return res.status(200).send(fundCompanies);
            
    });
    
};

export function postFundCompany (req, res, next) {
    
    const data = req.body;
    
    let fundCompany = {};
    
    for (let path of paths) {
        
        if (req.body[path] !== undefined) {
            fundCompany[path] = req.body[path];
        }
    }
    
    if (fundCompany.type) {
        fundCompany.type = mongoose.Types.ObjectId(fundCompany.type);
    }
    
    FundCompanyModel.create(fundCompany, (err) => {

        if (err) {

            switch (err.code) {
                case 11000:
                    res.status(403).send({errMsg: '基金公司已经存在'});
                    break;
                default:
                    res.status(500).send(err);
            }

            return next();
        }

        return res.status(200).send({msg: '创建成功'});

    });
    
};

export function putFundCompany (req, res, next) {
    
    let updateFundCompany = {};
    
    for (let path of paths) {
        
        if (req.body[path] !== undefined) {
            updateFundCompany[path] = req.body[path];
        }
    }
    
    if (updateFundCompany.type) {
        updateFundCompany.type = mongoose.Types.ObjectId(updateFundCompany.type);
    }
    
    const id = req.body._id;
    
    FundCompanyModel.findByIdAndUpdate(id, updateFundCompany)
        .exec((err, fundCompany) => {

            if (err) {
                res.status(403).send(err);
                return next();
            }

            if (fundCompany) {
                return res.status(200).send({msg: '更新成功'});
            } else {
                res.status(403).send({errMsg: '基金公司不存在'});
                return next();
            }

        });
    
};

export function deleteFundCompany (req, res, next) {
    
    const id = req.body._id;
    const name = req.body.name;
    let query;
    
    if (id) {
        query = FundCompanyModel.findByIdAndRemove(id);
    } else {
        query = FundCompanyModel.findOneAndRemove({name});
    }
    
    query.exec((err, fundCompany) => {

        if (err) {
            res.status(403).send(err);
            return next();
        }

        if (fundCompany) {
            return res.status(200).send({msg: '删除成功'});
        } else {
            res.status(403).send({errMsg: '基金公司不存在'});
            return next();
        }

    });
    
};