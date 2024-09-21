import { readDatabase } from './databaseService.js'
import { rl, start } from './index.js'

start()

let database = {
  tasks: [],
  lastId: 0,
  updatedAt: null
}

let testsPassed = []
let testsFailed = []

function addSucess() {

  const command = '>task-cli add "teste 1" \n'
  rl.write(command)

  database = readDatabase()

  if (
    database.lastId == 1 &&
    database.tasks.length == 1 &&
    database.tasks[0].description == 'teste 1' &&
    database.tasks[0].updatedAt == null
  ) {
    testsPassed.push('Add Success')
  } else {
    testsFailed.push('Add Success')
  }
}

addSucess()

console.log(`
  \x1b[34m====== Report ======
  \x1b[32mTests Passed: ${testsPassed.toString()}
  \x1b[31mTests Failed: ${testsFailed.toString()}\x1b[0m
`)

process.exit()