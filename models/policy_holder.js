import mongoose from "mongoose";
const PolicyHolderSchema = new mongoose.Schema({
    name:{type:String,unique:true},
    holder:{type:[String],default:[]}
});

PolicyHolderSchema.pre("save", function (next) {
  this.holder = [...new Set(this.holder)];
  next();
});

export default mongoose.model("policyHolder",PolicyHolderSchema);