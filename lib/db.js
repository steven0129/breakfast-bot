const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = (dbUrl, dbName, dbCollection, dbPort) => {
    mongoose.connect(`${dbUrl}:${dbPort}/${dbName}`)

    const collection = {}
    Object.entries(dbCollection).map((value, index) => {
        name = value[0]
        schema = value[1]
        collection[name] = mongoose.model(name, new Schema(schema))
    })

    return collection

    // return mongoose.model(dbCollection, new Schema({
    //     name: String,
    //     price: Number
    // }))
}