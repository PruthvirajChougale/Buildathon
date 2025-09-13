import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    email:{type:String,unique:true,require:true},
    contact:{type:String,unique:true,require:true},
    password:{type:String,require:true}
});

const Employeedb = mongoose.model("employee",EmployeeSchema);
export default Employeedb;