import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const paths = ['name', 'status', 'issuer', 'salesDate', 'term', 'paymentMethod', 'investIndustry', 'progress', 'progressDesc', 'size', 'sizeStructure', 'salesPolicies', 'loanToValueRatio', 'investProvince', 'investCity', 'accountInfo', 'investTarget', 'investMethod', 'repaySource', 'riskManagement', 'highlights', 'moreInfo'];

const SalesPolicySchema = new Schema({
//    {min: 100, max: 300, expectedReturn: 7.2, rebate: 3.5}
    min: Number,
    max: Number,
    expectedReturn: Number,
    rebate: Number,
});

const UnitTrustFundSchema = new Schema({
    name: {
        //华创资管-华恒系列-贵阳恒大资管计划
        type: String,
        required: true,
        unique: true,
    },
    status: {
        //在售
        type: String,
    },
    issuer: {
        //华创期货
        type: Schema.Types.ObjectId,
        ref: 'fund.company',
        required: true,
    },
    salesDate: {
        type: Date,
    },
    term: {
        //12
        type: Number,
    },
    paymentMethod: {
        //半年付息
        type: String,
    },
    investIndustry: {
        //房地产类
        type: String,
    },
    progress: {
        //40
        type: Number,
    },
    progressDesc: {
        //【2017年3月30日11时更新】本期是第7期，本期规模1400万，已进款800万，募满封账，下一期待定。
        type: String,
    },
    size: {
        //25000万
        type: Number,
    },
    sizeStructure: {
        //小额畅打
        type: String,
    },
    salesPolicies: {
        type: [SalesPolicySchema],
    },
    loanToValueRatio: {
        //20
        type: Number,
    },
    investProvince: {
        //贵州
        type: String,
    },
    investCity: {
        //贵阳
        type: String,
    },
    accountInfo: {
        //账户名、帐号、开户行等
        type: String,
    },
    investTarget: {
        //XXX公司
        type: String,
    },
    investMethod: {
        //用于认购GD信托的集合信托计划
        type: String,
    },
    repaySource: {
        //1.XXX收入 2.担保履约
        type: String,
    },
    riskManagement: {
        //1. 连带责任 2. 股权质押
        type: String,
    },
    highlights: {
        //1.多重还款来源 2. 担保方实力强大
        type: String,
    },
    moreInfo: {
        type: String,
    },
}, {
    timestamps: true,
});

const UnitTrustFund = mongoose.model('UnitTrustFund', UnitTrustFundSchema);

export default UnitTrustFund;