const request = require('request-promise')

module.exports = (luisUrl) => {
    return (query) => {
        let ans = {}
        
        request(luisUrl + encodeURIComponent(query))
            .then((response) => ans = JSON.parse(response))
            .catch((error) => console.log(error))
            
        return ans
    }
}