const request = require('request-promise-native')

module.exports = (luisUrl) => {
    let api = {}

    api.identify = async (query) => {
        let ans = await request(luisUrl + encodeURIComponent(query))
        return JSON.parse(ans)
    }

    return api
}