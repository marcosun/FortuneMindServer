import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const paths = ['name'];

export const FundCompanyTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

export const FundCompanyTypeModel = mongoose.model('fund.company.type', FundCompanyTypeSchema);

export default FundCompanyTypeModel;