import FundCompanyModel, { paths } from '../models/fundCompany';
import FundCompanyTypeModel from '../models/fundCompanyType';

export function getFundCompany (req, res, next) {
    
    FundCompanyModel.find()
        .select('name type logo -_id')
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
    
    const fundCompanyTypeName = data.type;
    
    FundCompanyTypeModel.findOne({name: fundCompanyTypeName})
        .exec((err, fundCompanyType) => {
            //find company type with type name
            if (err) {
                res.status(403).send({errMsg: '类型不存在'});
                return next();
            }

            if (fundCompanyType == null) {
                res.status(403).send({errMsg: '类型不存在'});
                return next();
            }

            const fundCompany = {
                name: data.name,
                type: fundCompanyType._id,
                logo: data.logo,
            };

            FundCompanyModel.create(fundCompany, (err) => {

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

        });
    
};

export function putFundCompany (req, res, next) {
    
    const updateFundCompanyFunction = () => {
        FundCompanyModel.findOneAndUpdate({name: oldName ? oldName : name}, updateFundCompany)
            .exec((err, fundCompany) => {

                if (err) {
                    res.status(403).send(err);
                    return next();
                }

                if (fundCompany) {
                    return res.status(200).send({msg: '更新成功'});
                } else {
                    res.status(403).send({errMsg: '基金不存在'});
                    return next();
                }

            });
    };
    
    const oldName = req.body.oldName;
    const name = req.body.name;
    
    let updateFundCompany = {};
    
    for (let path of paths) {
        
        if (req.body[path] !== undefined) {
            updateFundCompany[path] = req.body[path];
        }
    }
    
    if (updateFundCompany.type) {
        //find fundCompanyType
        //update fundCompany.type with _id
        FundCompanyTypeModel.findOne({name: updateFundCompany.type})
            .exec((err, fundCompanyType) => {
                
                if (err) {
                    res.status(403).send(err);
                    return next();
                }
                
                if (fundCompanyType == null) {
                    res.status(403).send({errMsg: '类型不存在'});
                    return next();
                }
                
                updateFundCompany.type = fundCompanyType._id;
                updateFundCompanyFunction();
            });
    } else {
        updateFundCompanyFunction();
    }
    
};

export function deleteFundCompany (req, res, next) {
    
    const name = req.body.name;
    
    FundCompanyModel.findOneAndRemove({name})
        .exec((err, fundCompany) => {

            if (err) {
                res.status(403).send(err);
                return next();
            }
            
            if (fundCompany) {
                return res.status(200).send({msg: '删除成功'});
            } else {
                res.status(403).send({errMsg: '基金不存在'});
                return next();
            }

    });
    
};