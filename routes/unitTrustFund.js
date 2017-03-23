import UnitTrustFund from '../models/unitTrustFund';

let dictionary = ['name', 'status', 'issuerName', 'issuerType', 'startFrom', 'term', 'paymentMethod', 'investIndustry', 'progress', 'size', 'sizeStructure', 'salesInfo', 'investArea', 'account', 'investBody', 'investMethod', 'repaySource', 'riskManagement', 'highlight', 'explanation'];

export function getUnitTrustFundDeatil (req, res, next) {
    
    UnitTrustFund.findOne({
        
        name: req.query.name,
        
    }, {
        _id: 0,
        updatedAt: 0,
        createdAt: 0,
        __v: 0,
    }, (err, doc) => {
        
        console.log(err);
        
        //throw error if err or doc does not exist
        if (err || doc == null) {
            res.status(409).send({msg: '该基金不存在'});
            return next();
        };
        
        return res.status(200).send(doc);
        
    });
    
};

export function getUnitTrustFundDescription (req, res, next) {
    
    UnitTrustFund.findOne({
        
        name: req.query.name,
        
    }, {
        
        _id: 0,
        name: 1,
        startFrom: 1,
        term: 1,
        investIndustry: 1,
        progress: 1,
        status: 1,
        salesInfo: 1,
        sizeStructure: 1
        
    }, (err, doc) => {
        
        console.log(err);
        
        //throw error if err or doc does not exist
        if (err || doc == null) {
            res.status(409).send({msg: '该基金不存在'});
            return next();
        };
        
        return res.status(200).send(doc);
        
    });
    
};

export function postUnitTrustFund (req, res, next) {
    
    //compose document to be created
    let newDoc = {};
    
    for (let field of dictionary) {

        if (req.body[field] !== undefined) {
            newDoc[field] = req.body[field];
        }
    }
    
    UnitTrustFund.create(newDoc, (err) => {
        if (err) {
            res.status(409).send(err);
            return next();
        };
        
        return res.status(200).send({msg: '创建成功'});
    });
    
};

export function putUnitTrustFund (req, res, next) {
    
    UnitTrustFund.findOne({
        
        name: req.body.name,
        
    }, (err, doc) => {
        
        //throw error if err or doc does not exist
        if (err || doc == null) {
            res.status(409).send({msg: '该基金不存在'});
            return next();
        };
        
        //iterate over dictionary to update fields
        for (let field of dictionary) {
            
            if (req.body[field] !== undefined) {
                doc[field] = req.body[field];
            }
        }
        
        //do update with db
        doc.save((err) => {
            
            if (err) {
                res.status(409).send(err);
                return next();
            }
            
            return res.status(200).send({msg: '更新成功'});
        });
        
        
    });
    
};