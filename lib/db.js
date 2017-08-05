const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = (dbUrl, dbName, dbCollection, dbPort) => {
    mongoose.connect(`${dbUrl}:${dbPort}/${dbName}`)
    return mongoose.model(dbCollection, new Schema({
        name: String,
        price: Number
    }))
}