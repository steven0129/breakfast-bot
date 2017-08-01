const mongoose = require('mongoose')

module.exports = (dbUrl, dbName) => {
    mongoose.connect(`${dbUrl}/${dbName}?ssl=true`)
    const Schema = mongoose.Schema
    const colleciton = {}

    collection['menu1'] = () => {
        let model = mongoose.model('menu1', new Schema({
            name: String,
            price: Number
        }))

        return model
    }
}
