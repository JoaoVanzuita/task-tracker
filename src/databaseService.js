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

function writeDatabase(database, isUpdate) {

  fs.writeFileSync(dbPath, JSON.stringify({
    tasks: database.tasks,
    lastId: database.lastId,
    updatedAt: isUpdate ? Date.now() : null
  }), { encoding: 'utf-8' })
}

export function readDatabase() {

  return JSON.parse(fs.readFileSync(dbPath, { encoding: 'utf-8' }))
}

export function createTask(taskDescription) {

  const newTask = {
    id: database.lastId + 1,
    description: taskDescription,
    status: 'todo',
    createdAt: Date.now(),
    updatedAt: null
  }

  database.tasks.push(newTask)

  database.lastId += 1

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

export function updateTaskDescription(id, description) {

  let task = getTaskById(id)

  task.description = description
  task.updatedAt = Date.now()

  const taskIndex = database.tasks.findIndex(task => task.id == id)

  database.tasks[taskIndex] = task

  writeDatabase(database, true)
}

export function updateTaskStatus(id, status) {
  let task = getTaskById(id)

  task.status = status
  task.updatedAt = Date.now()

  const taskIndex = database.tasks.findIndex(task => task.id == id)

  database.tasks[taskIndex] = task

  writeDatabase(database, true)
}

export function removeTask(taskId) {

  database.tasks = database.tasks.filter(task => task.id != taskId)

  writeDatabase(database, true)
}