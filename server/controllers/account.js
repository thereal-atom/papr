const accountSchema = require("../models/accountSchema");

const getAccount = async (req, res) => {
    const result = await accountSchema.findOne({email: req.params.email});
    res.send(result);
} 
const createAccount =  async (req, res) => {
    const result = await accountSchema.findOne({}).sort({accountId: -1});
    try {
        const accountInfo = {
            email: req.body.email,
            accountId: result ? result.accountId + 1 : 100000,
            balance: 1000,
        }
        await new accountSchema(accountInfo).save();
        res.send('Account sucesfully created.');  
    } catch (error) {
        console.log(error)
        res.send('There was an error creating this account.');  
        
    }
}
const updateAccount = async (req, res) =>{
    await accountSchema.updateOne({email: req.body.email}, {balance: req.body.balance});
    res.sendStatus(200);
}
module.exports = {
    createAccount,
    updateAccount,
    getAccount,
}
