import express from "express";
import Customerdb from "../models/customer.js";

export const DashboardCustomer = async (_,res) => {
    try {
        const customers = await Customerdb.find();

        const now = new Date();
        now.setHours(0, 0, 0, 0); // normalize current date

        const result = customers
            .map(customer => {
            const renewalDiffs = customer.policy
                .map(policy => {
                if (!policy.renewalDate) return null;

                // Parse dd-mm-yyyy format
                const [day, month, year] = policy.renewalDate.split("-");
                const rDate = new Date(year, month - 1, day);
                rDate.setHours(0, 0, 0, 0);

                const diffMs = rDate - now;
                const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

                return (diffDays >= 0 && diffDays <= 7) ? diffDays : null;
                })
                .filter(d => d !== null);

            if (renewalDiffs.length === 0) return null;

            const minDays = Math.min(...renewalDiffs);

            return {
                name: customer.name,
                contact: customer.contact,
                mailId: customer.mailId,
                nextRenewalIn: minDays
            };
            })
            .filter(c => c !== null);

        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const AddUser = async (req, res) => {
    try {
        const userDetails = req.body;

        let user = await Customerdb.findOne({ mailId: userDetails.mailId });

        const policyData = {
            premium: userDetails.premium,
            policyType: userDetails.policyType,
            policyName: userDetails.policyName,
            startDate: userDetails.startDate,
            renewalDate: userDetails.renewalDate,
            claim: false,
            policyNumber: userDetails.policyNumber,
            insuranceCompany: userDetails.insuranceCompany,
            nomineeName: userDetails.nomineeName,
            relation: userDetails.relation,
            nomineeContact: userDetails.nomineeContact,
        };

        if (user) {
            user.policy.push(policyData);
            await user.save();
            res.status(200).json({ message: "Policy added to existing user" });
        } else {
            const newCustomer = new Customerdb({
                name: userDetails.name,
                contact: userDetails.contact,
                alternateContact: userDetails.alternateContact,
                mailId: userDetails.mailId,
                birthDate: userDetails.birthDate,
                gender: userDetails.gender,
                policy: [policyData],
            });

            await newCustomer.save();
            res.status(200).json({ message: "New user and policy saved" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
};


// export const AddUser = async (req,res) => {//name,contact,mailId
//     try{
//         const userDetails = req.body;
//         const user = await Customerdb.findOne({mailId:userDetails.mailId});
//         if(user){
//             res.status(400).json({message:"User already exist"});
//         }

//         const customer = new Customerdb({
//             name:userDetails.name,
//             contact:userDetails.contact,
//             alternateContact:userDetails.alternateContact,
//             mailId:userDetails.mailId,
//             birthDate:userDetails.birthDate,
//             gender:userDetails.gender,
//         });

//         await customer.save();
//         res.status(200).json({message:"Customer saved"});
//     }
//     catch(e){
//         console.log(e);
//         res.status(500).json({message:e});
//     }
// }

// export const AddPolicy = async (req,res) => {//mailId,policy
//     try{
//         const newPolicy = req.body;
//         const user = await Customerdb.findOne({mailId:newPolicy.mailId});
//         if(user){
//             user.policy.push({
//                 premium:newPolicy.premium,
//                 policyType:newPolicy.policyType,
//                 policyName:newPolicy.policyName,
//                 startDate:newPolicy.startDate,
//                 renewalDate:newPolicy.renewalDate,
//                 claim:false,
//                 policyNumber:newPolicy.policyNumber,
//                 insuranceCompany:newPolicy.insuranceCompany,
//                 nomineeName:newPolicy.nomineeName,
//                 relation:newPolicy.relation,
//                 nomineeContact:newPolicy.nomineeContact,
//             });
//             await user.save();
//             res.status(200).json({message:"Policy added"});
//         }
//         else{
//             res.status(400).json({message:"User doesn't exist"});
//         }
//     }
//     catch(e){
//         res.status(400).json(e);
//     }
// }

export const Claim = async (req,res) => {//mailId,status
    try{
        const claim = req.body;
        const user = await Customerdb.findOne({mailId:claim.mailId});
        if(user){
            const policy = user.policy.find(p => p.name === claim.policy_name);
            if(!policy){
                res.status(400).json({message:"Policy not found"});
            }
            policy.status = claim.status;
            policy.claim=true;
            await user.save();
            res.status(200).json({message:"Policy status updated"});
        }
        else{
            res.status(400).json({message:"User doesn't exist"});
        }
    }
    catch(e){
        res.json(500).json({message:e});
    }
}

export const getCustomerDetails = async (_,res) => {
    try{
        const customers = await Customerdb.find();
        res.status(200).json({customers});
    }
    catch(e){
        res.status(500).json(e);
    }
}