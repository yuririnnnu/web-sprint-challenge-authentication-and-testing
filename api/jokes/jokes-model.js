const db = require('./../../data/dbConfig')

function get() {
    return db('users')
}

function getBy(filter) {
    return db('users')
        .where(filter)
        .first()
}

function getById(id) {
    return db('users')
        .where('id', id)
        .first()
}

async function create(user) {
    const [id] = await db('users').insert(user)
    return getById(id)
}

module.exports = { get, getBy, getById, create }