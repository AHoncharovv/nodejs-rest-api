const getAll = require('./getAll')
const getById = require('./getById')
const deleteById = require('./deleteById')
const add = require('./add')
const changeById = require('./changeById')
const updateStatusContact = require('./updateStatusContact')

module.exports = {
    getAll,
    getById,
    deleteById,
    add,    
    changeById,
    updateStatusContact
}