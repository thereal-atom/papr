const mongoose = require('mongoose')
const mongoPath = `mongodb+srv://netninja:tickerlive@cluster0.vd6ei.mongodb.net/paper?retryWrites=true&w=majority`
module.exports = async () => {
    await mongoose.connect(mongoPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    return mongoose 
 
};