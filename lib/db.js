const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)

module.exports = (dbUrl, dbName) => {
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
