import { createInterface } from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { createTask, getAllTasks, getTaskByStatus, initDatabase, removeTask, updateTaskDescription, updateTaskStatus } from './databaseService.js'

export const rl = createInterface({ input, output })

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


  const taskDescription = getTaskDescription(args)

  const newTaskId = createTask(taskDescription)

  console.log(`Task added successfully (ID: ${newTaskId})`)
}

function updateTask(args) {


  const taskId = getTaskId(args)

  const taskDescription = getTaskDescription(args)

  updateTaskDescription(taskId, taskDescription)
}

function listTasks(args) {
  const query = args


  if (!listQueries.includes(query)) {
    console.log('Argumento inválido')
    return
  }

  console.log(`Listing ${query ?? 'all'} tasks`)

  let tasks

  if (query) {
    tasks = getTaskByStatus(query)
  } else {
    tasks = getAllTasks()
  }

  console.log(tasks)
}

function deleteTask(args) {

  const taskId = getTaskId(args)

  removeTask(taskId)
}

function markDoneTask(args) {

  const taskId = getTaskId(args)

  updateTaskStatus(taskId, 'done')
}

function markInProgressTask(args) {

  const taskId = getTaskId(args)

  updateTaskStatus(taskId, 'in-progress')
}

export function start() {
  rl.on('line', input => {

    if (!input.startsWith('task-cli') && !input.startsWith('>task-cli')) {
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
}

// start()