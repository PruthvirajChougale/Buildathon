import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name:{type:String,require:true},
    contact:{type:String,require:true},
    alternateContact:{type:String},
    mailId:{type:String,unique:true,require:true},
    birthDate:{type:String,require:true},
    gender:{type:String,require:true},
    policy:[{
        policyNumber:{type:String,require:true},
        insuranceCompany:{type:String,require:true},
        policyType:{type:String,require:true},
        premium:{type:Number},
        policyName:{type:String},
        startDate:{type:String},
        renewalDate:{type:String},
        nomineeName:{type:String,require:true},
        relation:{type:String,require:true},
        nomineeContact:{type:String},
        claim:{type:Boolean},
        status:{
            type:String,
            enum:["Submission","Verification","Approval","Settle"]
        }
    }]
});

const Customerdb = mongoose.model("customer",CustomerSchema);
export default Customerdb;