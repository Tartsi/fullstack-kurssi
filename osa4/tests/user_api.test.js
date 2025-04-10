const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

describe('User API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('fails with 400 if username does not exist', async () => {
        const initialUsers = await usersInDb()

        const invalidUser = {
            username: '',
            name: 'Too Short Username',
            password: 'validpassword',
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)

        assert.strictEqual(response.body.error, 'username and password are required')

        const usersAfter = await usersInDb()
        assert.strictEqual(usersAfter.length, initialUsers.length)
    })

    test('fails with 400 if password is too short', async () => {
        const initialUsers = await usersInDb()

        const invalidUser = {
            username: 'validuser',
            name: 'Too Short Password',
            password: 'pw',
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)

        assert.strictEqual(response.body.error, 'password must be at least 3 characters long')

        const usersAfter = await usersInDb()
        assert.strictEqual(usersAfter.length, initialUsers.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})
