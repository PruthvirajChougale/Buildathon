import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
    policyName:{type:String},
    policyNumer:{type:String},
    premium:{type:Number},
    coverage:{type:Number},
    hignlights:{type:[String]},
    riders:{type:[String]}
});

const Policydb = mongoose.model("policy",PolicySchema);
export default Policydb;