const db = require("./database.js")

class monthlyAmount {
    //date - M*Y
    constructor (user, date, type, typeName, amount) {
        /** @type {string} */
        this.user = user
        /** @type {string} */
        this.date = date
        /** @type {boolean} */
        this.type = type
        /** @type {string} */
        this.typeName = typeName
        /** @type {number} */
        this.amount = amount
    }
}

/**
 * @param {Promise} promise 
 * @returns {Promise}
 */

module.exports.SQLTransactionsToArr = SQLTransactionsToArr