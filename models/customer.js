import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name:{type:String,require:true},
    contact:{type:String,require:true},
    mailId:{type:String,unique:true,require:true},
    policy:[{
        premium:{type:Number},
        policy_name:{type:String,unique:true},
        joinDate:{type:String},
        renewalDate:{type:String},
        claim:{type:Boolean},
        status:{
            type:String,
            enum:["Submission","Verification","Approval","Settle"]
        }
    }]
});

const Customerdb = mongoose.model("customer",CustomerSchema);
export default Customerdb;