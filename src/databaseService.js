import fs from 'fs'
const dbPath = './database.json'

let database = {
  tasks: [],
  lastId: 0,
  updatedAt: null
}

function getLastId() {

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
}

function readDatabase() {

  return JSON.parse(fs.readFileSync(dbPath, { encoding: 'utf-8' }))
}

export function createTask(taskDescription) {
  const newTask = {
    id: getLastId() + 1,
    description: taskDescription,
    status: 'todo',
    createdAt: Date.now(),
    updatedAt: null
  }

  database.tasks.push(newTask)

  writeDatabase(database)

  return newTask.id
}
