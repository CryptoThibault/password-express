const express = require('express')
const fsPromises = require('fs/promises')
const ethers = require('ethers')
const app = express()

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
const IP_LOOPBACK = 'localhost'
const LOG_FILE = 'log.json'
const FORMAT_FILE = 'utf-8'

app.get('/', async (req, res) => {
  res.send(`Welcome to your local server at PORT ${PORT}`)
});

app.get('/register/:username/:password', async (req, res) => {
  if (!userChecker(req.params.username)) {
    const log = `"${req.params.username}": ${ethers.utils.keccak256(req.params.password)}`
    await fsPromises.appendFile(LOG_FILE, JSON.stringify(log), FORMAT_FILE)
    res.send(`Your register as ${req.params.username}`)
  } else {
    res.send(`The username ${req.params.username} already use`)
  }
});

app.get('/login/:username/:password', async (req, res) => {
  const log = JSON.parse(await fsPromises.readFile(LOG_FILE, FORMAT_FILE))
  if (userChecker(req) && passwordChecker(req)) {
    res.send(`Welcome to your dahsboard ${req.params.username}`)
  } else {
    res.send('Username or Password incorect')
  }
});

app.listen(PORT, async () => {
  console.log(`App listening at http://${IP_LOOPBACK}:${PORT}`)
});
