const positionSchema = require("../models/positionSchema")
const axios = require("axios");

const getPositions = async (req, res) => {
    const result = await positionSchema.find({})
    if(result){
        res.send(result);
    }else{
        res.send('No result found');
    }
}
const buyPosition = async (req, res) => {
    try {
        const result = await positionSchema.findOne({}).sort({id: -1});
        const { body } = req;
        const pos = {
            entry: body.entry,
            amount: body.amount, 
            pair: body.pair,
            cost: parseFloat(body.entry * body.amount).toFixed(2),
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
    const result = await positionSchema.findOne({id: req.params.id});
    if(result){
        try {
            await positionSchema.deleteOne({id: req.params.id});
            res.send('Position succesfully deleted');
        } catch (error) {
            console.log(error);
            res.send('There was an error');
        }
    }else{
        res.send('This position does not exist');
    }
}

module.exports = {
    getPositions, 
    buyPosition,
    sellPosition,
}