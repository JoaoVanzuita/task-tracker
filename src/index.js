import { createInterface } from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { createTask, initDatabase } from './databaseService.js'

const rl = createInterface({ input, output })

initDatabase()

const commandMap = {
  'add': addTask,
  'list': listTasks,
  'update': updateTask,
  'delete': deleteTask,
  'mark-done': markDoneTask,
  'mark-in-progress': markInProgressTask
}

const listQueries = [
  'done',
  'todo',
  'in-progress',
  null
]

function getTaskDescription(args) {

  const hasTwoQuotes = args.match(/"/g).length == 2

  if (!hasTwoQuotes) {
    console.log('Argumento inválido')
    return
  }

  return args.substring(args.indexOf('"') + 1, args.length - 1)
}

function getTaskId(args) {

  const taskId = args.split(' ')[0]

  if (!typeof taskId == 'number') {
    console.log('Argumento inválido')
    return
  }

  return taskId
}

function addTask(args) {

  console.log('executando "add"')

  const taskDescription = getTaskDescription(args)

  const newTaskId = createTask(taskDescription)

  console.log(`Task added successfully (ID: ${newTaskId})`)
}

function updateTask(args) {

  console.log('Executando "update"')

  const taskId = getTaskId(args)

  const taskDescription = getTaskDescription(args)

  console.log(taskId)
  console.log(taskDescription)
}

function listTasks(args) {
  const query = args

  console.log('Executando "list"')

  if (!listQueries.includes(query)) {
    console.log('Argumento inválido')
    return
  }

  console.log(`List ${query ? query : 'all'} tasks`)
}

function deleteTask(args) {
  console.log('Executando "delete"')

  const taskId = getTaskId(args)

  console.log(taskId)
}

function markDoneTask(args) {
  console.log('Executando markDone')

  const taskId = getTaskId(args)

  console.log(taskId)
}

function markInProgressTask(args) {
  console.log('Executando markInProgress')

  const taskId = getTaskId(args)

  console.log(taskId)
}

rl.on('line', input => {

  if (!input.startsWith('task-cli')) {
    return
  }

  const command = input.split(' ')[1]

  const func = commandMap[command]

  const indexArgsStart = input.indexOf(' ', input.indexOf(' ') + 1)
  let args = null

  if (indexArgsStart > 0) {
    args = input.substring(indexArgsStart).trim()
  }

  if (func) {
    func(args)
    return
  }

  console.log('Comando não encontrado')
})