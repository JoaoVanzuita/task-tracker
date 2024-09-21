import { readDatabase } from './databaseService.js'
import { rl, start } from './index.js'

let logs = []
console.log = function (d) {
  logs.push(d)
  process.stdout.write(d + '\n')
}

let database = {
  tasks: [],
  lastId: 0,
  updatedAt: null
}

let testsPassed = []
let testsFailed = []

function addSucess() {

  const command = '>task-cli add "teste 1"\n'
  rl.write(command)

  database = readDatabase()

  const feedBackAdd = logs[logs.length - 1]

  if (
    feedBackAdd == 'Task added successfully (ID: 1)' &&
    database.lastId == 1 &&
    database.tasks.length == 1 &&
    database.updatedAt != null &&
    database.tasks[0].description == 'teste 1' &&
    database.tasks[0].status == 'todo' &&
    database.tasks[0].createdAt == database.updatedAt &&
    database.tasks[0].updatedAt == null
  ) {
    testsPassed.push('Add Success')
  } else {
    testsFailed.push('Add Success')
  }
}

function updateSuccess() {
  const command = '>task-cli update 1 "teste 1 - edited"\n'
  rl.write(command)

  database = readDatabase()

  if (
    database.lastId == 1 &&
    database.tasks.length == 1 &&
    database.tasks[0].description == 'teste 1 - edited' &&
    database.tasks[0].status == 'todo' &&
    database.tasks[0].updatedAt == database.updatedAt
  ) {
    testsPassed.push('Update Success')
  } else {
    testsFailed.push('Update Success')
  }
}

function listSuccess() {

  const command = '>task-cli list\n'
  rl.write(command)

  const result = JSON.parse(logs[logs.length - 1])

  if (
    result.length == 1 &&
    result[0].id == 1 &&
    result[0].description == 'teste 1 - edited'
  ) {
    testsPassed.push('List Success')
  } else {
    testsFailed.push('List Success')
  }

}

function markInProgressSuccess() {
  const command = '>task-cli mark-in-progress 1\n'
  rl.write(command)

  database = readDatabase()

  if (
    database.lastId == 1 &&
    database.tasks.length == 1 &&
    database.tasks[0].description == 'teste 1 - edited' &&
    database.tasks[0].status == 'in-progress' &&
    database.tasks[0].updatedAt == database.updatedAt
  ) {
    testsPassed.push('MarkInProgress Success')
  } else {
    testsFailed.push('MarkInProgress Success')
  }
}

function markDoneSuccess() {
  const command = '>task-cli mark-done 1\n'
  rl.write(command)

  database = readDatabase()

  if (
    database.lastId == 1 &&
    database.tasks.length == 1 &&
    database.tasks[0].description == 'teste 1 - edited' &&
    database.tasks[0].status == 'done' &&
    database.tasks[0].updatedAt == database.updatedAt
  ) {
    testsPassed.push('MarkDone Success')
  } else {
    testsFailed.push('MarkDone Success')
  }
}

function deleteSuccess() {

  const command = '>task-cli delete 1\n'
  rl.write(command)

  const lastDatabaseUpdate = database.updatedAt

  database = readDatabase()

  console.log(database.updatedAt)
  console.log(lastDatabaseUpdate)

  if (
    database.lastId == 1 &&
    database.tasks.length == 0 &&
    database.updatedAt != lastDatabaseUpdate
  ) {
    testsPassed.push('Delete Success')
  } else {
    testsFailed.push('Delete Success')
  }
}

function runTests() {
  addSucess()
  updateSuccess()
  listSuccess()
  markInProgressSuccess()
  markDoneSuccess()
  deleteSuccess()
}

runTests()


console.log(`
  \x1b[34m====== Report ======
  \x1b[32mTests Passed: ${testsPassed.toString()}
  \x1b[31mTests Failed: ${testsFailed.toString()}\x1b[0m
`)

process.exit()