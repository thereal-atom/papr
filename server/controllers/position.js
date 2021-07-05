const positionSchema = require("../models/positionSchema")

const getPositions = async (req, res) => {
    const result = await positionSchema.find({accountId: req.params.accId})
    if(result){
        res.send(result);
    }else{
        res.send('No result found');
    }
}
const buyPosition = async (req, res) => {
    try {
        const { body } = req;
        const result = await positionSchema.findOne({user: body.user}).sort({id: -1});
        const pos = {
            user: body.user,
            accountId: body.accountId,
            entry: body.entry,
            margin: body.margin,
            amount: body.amount, 
            pair: body.pair,
            id: result ? result.id + 1 : 0,
        }
        await new positionSchema(pos).save();
        res.send('Position sucessfully entered');
    } catch (error) {
        console.log(error);
        res.send('There was an error');
    }
}
const sellPosition = async (req, res) => {
    try {
        await positionSchema.deleteOne({id: req.params.id, accountId: req.params.accId});
        res.send('Position succesfully deleted');
    } catch (error) {
        console.log(error);
        res.send('There was an error');
    }
}

module.exports = {
    getPositions, 
    buyPosition,
    sellPosition,
}