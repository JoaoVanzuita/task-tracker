import fs from 'fs'
const dbPath = './database.json'

//TODO: sync database before any operation

let database = {
  tasks: [],
  lastId: 0,
  updatedAt: null
}

//TODO: check if database.json is valid
export function initDatabase() {

  if (fs.existsSync(dbPath)) {
    database = readDatabase()

    return
  }

  writeDatabase(database)
}

function getLastId() {

  return database.lastId ? database.lastId : database.tasks.length
}

function writeDatabase(database, isUpdate) {

  fs.writeFileSync(dbPath, JSON.stringify({
    tasks: database.tasks,
    lastId: getLastId(database),
    updatedAt: isUpdate ? Date.now() : null
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

  writeDatabase(database, true)

  return newTask.id
}

export function getTaskById(taskId) {

  return database.tasks.find(task => task.id == taskId)
}

export function getAllTasks() {
  return database.tasks
}

export function getTaskByStatus(taskStatus) {
  return database.tasks.filter(task => task.status == taskStatus)
}