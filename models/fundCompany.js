import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const paths = ['name', 'type', 'logo'];

export const FundCompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'fund.company.type',
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const FundCompanyModel = mongoose.model('fund.company', FundCompanySchema);

export default FundCompanyModel;