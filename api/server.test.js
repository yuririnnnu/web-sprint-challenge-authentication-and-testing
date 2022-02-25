const User = require('./jokes/jokes-model')
const server = require('./server')
const request = require('supertest')
const db = require('./../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
test('verify we are using the correct environment', ()  => {
  expect(process.env.NODE_ENV).toBe('testing')
});
describe('[1] /api/auth/register', () => {
  test('register successfully', async () => {
    const result = await User.create({username: 'Lily', password: '1234'})
    expect(result).toHaveProperty('username','Lily')
  })
  test('does not accept register if there is no input', async () => {
    const result = await request(server).post('/api/auth/register').send({username: '', password: ''})
    expect(result.status).toBe(401)
  })
  test('find user by id', async () => {
    const {id} = await User.create({username: 'Lily', password: '1234'})
    const result = await User.getById(id)
    expect(result).toHaveProperty('username','Lily')
  })
})
describe('[2] /api/auth/login', () => {
  test('accept login if input is valid', async () => {
    await request(server).post('/api/auth/register').send({username: 'Lily', password: '1234'})
    const loggedIn = await request(server).post('/api/auth/login').send({username: 'Lily', password: '1234'})
    expect(loggedIn.status).toBe(200)
  })
  test('reject login if the user does not exist', async () => {
    await request(server).post('/api/auth/register').send({username: 'Lily', password: '1234'})
    const loggedIn = await request(server).post('/api/auth/login').send({username: 'Lily2', password: '1234'})
    expect(loggedIn.status).toBe(404)
  })
})
// describe('[2] /api/jokes', () => {
//   test('able to take a look at the jokes', async () => {
//     await request(server).get('api/auth/register').send({username: 'Lily', password: '1234'})
//     const loggedIn = await request(server).get('api/auth/login').send({username: 'Lily', password: '1234'})

//     const result = await request(server).get('/api/jokes')
//     expect(result.status).toBe(200)
//   })
// })
