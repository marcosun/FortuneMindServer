import FundCompanyTypeModel from '../models/fundCompanyType';

export function getFundCompanyType (req, res, next) {
    
    FundCompanyTypeModel.find()
        .select('name -_id')
        .exec((err, fundCompanyTypes) => {
        
            if (err) {
                res.status(500).send(err);
                return next();
            }

            return res.status(200).send(fundCompanyTypes);
            
    });
    
};

export function postFundCompanyType (req, res, next) {
    
    const data = req.body;
    
    const newFundCompanyType = {
        name: data.name,
    };
    
    FundCompanyTypeModel.create(newFundCompanyType, (err) => {

            if (err) {
                
                switch (err.code) {
                    case 11000:
                        res.status(403).send({errMsg: '类型已经存在'});
                        break;
                    default:
                        res.status(500).send(err);
                }
                
                return next();
            }

            return res.status(200).send({msg: '创建成功'});

    });
    
};

export function putFundCompanyType (req, res, next) {
    
    const oldName = req.body.oldName;
    const name = req.body.name;
    
    FundCompanyTypeModel.findOneAndUpdate({name: oldName}, {name})
        .exec((err, fundCompanyType) => {

            if (err) {
                res.status(403).send(err);
                return next();
            }

            if (fundCompanyType) {
                return res.status(200).send({msg: '更新成功'});
            } else {
                res.status(403).send({errMsg: '类型不存在'});
                return next();
            }

    });
    
};

export function deleteFundCompanyType (req, res, next) {
    
    const name = req.body.name;
    
    FundCompanyTypeModel.findOneAndRemove({name})
        .exec((err, fundCompanyType) => {

            if (err) {
                res.status(403).send(err);
                return next();
            }
            
            if (fundCompanyType) {
                return res.status(200).send({msg: '删除成功'});
            } else {
                res.status(403).send({errMsg: '类型不存在'});
                return next();
            }

    });
    
};