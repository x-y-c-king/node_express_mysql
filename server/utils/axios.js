const axios = require("axios");

const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, { params }).then(res => {
            resolve(res);
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    get
}