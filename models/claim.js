import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
    claimDate:{type:[String]}
});

const Claimdb = mongoose.model("claim",ClaimSchema);
export default Claimdb;