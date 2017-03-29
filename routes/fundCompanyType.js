import { filterObjectWithKeys } from '../utils/utils';
import FundCompanyTypeModel, { paths } from '../models/fundCompanyType';

export function getFundCompanyType (req, res, next) {
    
    FundCompanyTypeModel.find()
        .select(paths.toString())
        .exec((err, fundCompanyTypes) => {
            
            if (err) {
                return next();
            }

            return res.status(200).send(fundCompanyTypes);
            
    });
    
};

export function getFundCompanyTypeById (req, res, next) {
    
    FundCompanyTypeModel.findById(req.params.id)
        .select(paths.toString())
        .exec((err, fundCompanyType) => {
        
            if (err) {
                return res.status(400).send({error: '参数错误'});
            }

            return res.status(200).send(fundCompanyType);
            
    });
    
};

export function postFundCompanyType (req, res, next) {
    
    const newFundCompanyType = filterObjectWithKeys(req.body, paths);
    
    FundCompanyTypeModel.create(newFundCompanyType, (err, fundCompanyType) => {
        
        if (err) {
            
            switch (err.code) {
                case 11000:
                    return res.status(400).send({error: '类型已经存在'});
                    break;
                default:
                    return next();
            }
            
        }
        
        return res.status(201).send(fundCompanyType);

    });
    
};

export function putFundCompanyType (req, res, next) {
    
    const id = req.body._id;
    
    const newFundCompanyType = filterObjectWithKeys(req.body, paths);
    
    FundCompanyTypeModel.findByIdAndUpdate(id, newFundCompanyType)
        .exec((err, fundCompanyType) => {

            if (err) {
                return next();
            }

            if (fundCompanyType) {
                return res.status(201).send(fundCompanyType);
            } else {
                return res.status(400).send({error: '类型不存在'});
            }

    });
    
};

export function deleteFundCompanyType (req, res, next) {
    
    const id = req.body._id;
    
    FundCompanyTypeModel.findByIdAndRemove(id)
        .exec((err, fundCompanyType) => {

            if (err) {
                return next();
            }

            return res.status(201).send();

        });
    
};