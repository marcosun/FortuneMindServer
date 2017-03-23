import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    issuerName: {
        //华创期货
        type: String,
    },
    issuerType: {
        //期货资管
        type: String,
    },
    startFrom: {
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
    size: {
        //2500
        type: Number,
    },
    sizeStructure: {
        //小额畅打
        type: String,
    },
    salesInfo: {
        //[{from: 100, to: 300, expectedReturn: 7.2, commisionDiscount: 3.5}]
        type: Array,
    },
    investArea: {
        //贵州 贵阳
        type: String,
    },
    account: {
        //账户名、帐号、开户行等
        type: String,
    },
    investBody: {
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
    highlight: {
        //1.多重还款来源 2. 担保方实力强大
        type: String,
    },
    explanation: {
        type: String,
    },
}, {
    timestamps: true,
});

const UnitTrustFund = mongoose.model('UnitTrustFund', UnitTrustFundSchema);

export default UnitTrustFund;