class Methods {
    static getSuccess(data) {
        return {
            msg: "",
            data,
            status: 200
        }
    }

    static getError(msg) {
        return {
            msg,
            data: null,
            status: 500
        }
    }
}

module.exports = Methods