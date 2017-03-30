import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { filterObjectWithKeys } from '../utils/utils';

import FundCompanyModel, { paths } from '../models/fundCompany';

export function getFundCompany (req, res, next) {
    
    FundCompanyModel.find()
        .select('name type logo')
        .populate('type', 'name')
        .exec((err, fundCompanies) => {
        
            if (err) {
                return next();
            }

            return res.status(200).send(fundCompanies);
            
    });
    
};

export function getFundCompanyById (req, res, next) {
    
    FundCompanyModel.findById(req.params.id)
        .select('name type logo')
        .populate('type', 'name')
        .exec((err, fundCompany) => {
        
            if (err) {
                return res.status(400).send({error: '参数错误'});
            }

            return res.status(200).send(fundCompany);
            
    });
    
};

export function postFundCompany (req, res, next) {
    
    const newFundCompany = filterObjectWithKeys(req.body, paths);
    
    if (newFundCompany.type) {
        newFundCompany.type = mongoose.Types.ObjectId(newFundCompany.type);
    }
    
    const logoTmpPath = newFundCompany.logo;
    const logoNewPath = `public/upload/${ logoTmpPath.split('/')[logoTmpPath.split('/').length - 1] }`;
    
    fs.readFile(logoTmpPath, (err, data) => {
        
        if (err) {
            return next();
        }

        //save tmp image to public folder so that all users have access
        fs.writeFile(logoNewPath, data, (err) => {
            
            if (err) {
                return next();
            }

            //delete temp image
            fs.unlink(logoTmpPath, (err) => {
                
            });
            
            //change image address from temporary folder to public folder so that all users have access
            newFundCompany.logo = logoNewPath;
            
            FundCompanyModel.create(newFundCompany, (err, fundCompany) => {

                if (err) {

                    switch (err.code) {
                        case 11000:
                            return res.status(400).send({error: '基金公司已经存在'});
                            break;
                        default:
                            return next();
                    }
                }
                
                return res.status(201).send(fundCompany);
            });
        })
    });
    
};

export function putFundCompany (req, res, next) {
    
    const id = req.body._id;
    
    const newFundCompany = filterObjectWithKeys(req.body, paths);
    
    if (newFundCompany.type) {
        newFundCompany.type = mongoose.Types.ObjectId(newFundCompany.type);
    }
    
    const logoTmpPath = newFundCompany.logo;
    let logoOldPath;
    const logoNewPath = `public/upload/${ logoTmpPath.split('/')[logoTmpPath.split('/').length - 1] }`;
    
    if (logoNewPath == logoTmpPath) {
        //if logo image does not update
        //update db straight way
        updateFundCompanyById(res, req, next, id, newFundCompany);
        
    } else {
        //when logo changes
        //there are two images to be deleted
        //one is old image in public folder
        //the other is tmp image in tmp folder
        
        //step1: delete old logo image
        FundCompanyModel.findById(id)
            .select('logo')
            .exec((err, fundCompany) => {
                if (err || fundCompany == undefined) {
                    
                } else {
                    logoOldPath = fundCompany.logo;
                    
                    fs.unlink(logoOldPath, (err) => {

                    });
                }
            });
        
        //step2: move logo image location in file system before save to db
        fs.readFile(logoTmpPath, (err, data) => {

            if (err) {
                return next();
            }

            //save tmp image to public folder so that all users have access
            fs.writeFile(logoNewPath, data, (err) => {

                if (err) {
                    return next();
                }

                //delete temp image
                fs.unlink(logoTmpPath, (err) => {
                    
                });

                //change image address from temporary folder to public folder so that all users have access
                newFundCompany.logo = logoNewPath;

                updateFundCompanyById(res, req, next, id, newFundCompany, next);
            })
        });
    }
    
};

export function deleteFundCompany (req, res, next) {
    
    const id = req.body._id;
    
    FundCompanyModel.findByIdAndRemove(id)
        .exec((err, fundCompany) => {
        
            if (err) {
                return next();
            }

            if (fundCompany) {
                //delete image
                fs.unlink(fundCompany.logo, (err) => {

                });

                return res.status(201).send();
            } else {
                return res.status(400).send({error: '基金公司不存在'});
            }

        });
    
};

const updateFundCompanyById = (res, req, next, id, newFundCompany) => {
    FundCompanyModel.findByIdAndUpdate(id, newFundCompany)
        .exec((err, fundCompany) => {

            if (err) {
                return next();
            }

            if (fundCompany) {
                return res.status(201).send(fundCompany);
            } else {
                return res.status(400).send({errMsg: '基金公司不存在'});
            }

        });
};