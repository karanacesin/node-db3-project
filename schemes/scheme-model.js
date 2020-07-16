const db = require("../data/db-config")

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return db("schemes")
}

function findById (id) {
    return db("schemes").where({id}).first()
}

function findSteps (id) {
    return db("steps")
        .join("schemes", "steps.scheme_id", "schemes.id")
        .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
        .where ({scheme_id: id})
}

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then (([id]) => {
            return findById(id)
        })
}

function update (id, updates) {
    return db("schemes")
        .where({id})
        .update(updates)
        .then(() => {
            return findById(id)
        })
}

function remove (id) {
    return db("schemes")
        .where ({id})
        .del()
        .then (() => {
            return null
        })
}