const express = require('express')
const fsPromises = require('fs/promises')
const ethers = require('ethers')
const app = express()

const db_user = {
  alice: '123',
  bob: '456',
  charlie: '789',
}

// Middleware for checking if user exists
const userChecker = (req, res, next) => {
  const username = req.body.username
  if (db_user.hasOwnProperty(username)) {
    next()
  } else {
    res.send('Username or Password invalid.')
  }
}

// Middleware for checking if password is correct
const passwordChecker = (req, res, next) => {
  const username = req.body.username
  const password = ethers.utils.kekak256(req.body.password)
  if (db_user[username] === password) {
    next()
  } else {
    res.send('Username or password invalid.')
  }
}

const PORT = 3333;
const IP = '192.168.1.82'
const LOG_FILE = 'log.json'
const FORMAT_FILE = 'utf-8'

app.get('/', async (req, res) => {
  res.send(`Welcome to your local server at PORT ${PORT}`)
});

app.use('/register', !userChecker)
app.use('/login', userChecker)
app.use('/login', passwordChecker)

app.post('/register', async (req, res) => {
  const log = `"${req.body.username}": ${ethers.utils.keccak256(req.body.password)}`
  await fsPromises.appendFile(LOG_FILE, log, FORMAT_FILE)
  res.send(`Your register as ${req.body.username}`)
})
app.post('/login', (req, res) => {
  res.send(`Welcome to your dahsboard ${req.body.username}`)
})

app.listen(PORT, IP, async () => {
  console.log(`App listening on ${IP}:${PORT}`)
});
