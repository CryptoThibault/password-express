const express = require('express')
const fsPromises = require('fs/promises')
const ethers = require('ethers')
const app = express()

const PORT = 3333;
const IP_LOOPBACK = 'localhost'
const LOG_FILE = 'log.json'
const FORMAT_FILE = 'utf-8'

app.get('/', async (req, res) => {
  res.send(`Welcome to your local server at PORT ${PORT}`)
});

app.post('/register/:username/:password', async (req, res) => {
  const log = JSON.parse(await fsPromises.readFile(LOG_FILE, FORMAT_FILE)) || {}
  const hash = ethers.utils.keccak256(req.params.password)
  const user = `"${req.params.username}": ${hash}`
  if (!log.includes(req.params.username)) {
    await fsPromises.appendFile(LOG_FILE, JSON.stringify(user), FORMAT_FILE)
    res.send(`Your register as ${req.params.username}`)
  } else {
    res.send(`The username ${req.params.username} already use`)
  }
});

app.post('/login/:username/:password', async (req, res) => {
  const log = JSON.parse(await fsPromises.readFile(LOG_FILE, FORMAT_FILE))
  const hash = ethers.utils.kekak256(req.params.password)
  if (log.includes(req.params.username) && req.params.username === hash) {
    res.send(`Welcome to your dahsboard ${req.params.username}`)
  } else {
    res.send('Username or Password incorect')
  }
});

app.listen(PORT, async () => {
  console.log(`App listening at http://${IP_LOOPBACK}:${PORT}`)
});
