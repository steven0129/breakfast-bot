const mongoose = require('mongoose')

module.exports = (dbUrl, dbName, dbPort) => {
    mongoose.connect(`${dbUrl}/${dbName}:${dbPort}?ssl=true`)
    const Schema = mongoose.Schema
    const collection = {}

    collection['menu1'] = () => {
        let model = mongoose.model('menu1', new Schema({
            name: String,
            price: Number
        }))

        return model
    }

    return collection
}
