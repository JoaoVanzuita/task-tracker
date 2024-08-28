const fs = require('fs')
const dbPath = './database.json'

let database = {
  tasks: [],
  lastId: 0,
  updatedAt: null
}

function getLastId(database) {

  return database.lastId ? database.lastId : database.tasks.length
}

function writeDatabase(database) {
  const updatedAt = Date.now()
  const lastId = getLastId(database)

  fs.writeFileSync(dbPath, JSON.stringify({
    tasks: database.tasks,
    lastId,
    updatedAt
  }), { encoding: 'utf-8' })

  return lastId
}

function readDatabase() {

  return JSON.parse(fs.readFileSync(dbPath, { encoding: 'utf-8' }))
}