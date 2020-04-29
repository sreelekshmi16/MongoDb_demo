const express = require('express')
const router = express.Router();
const {User} = require('../../../db/models/user')

const listUsers = async(id) => {
    return User.findById(id).select('_id name age');
}

module.exports = {
    listUsers
};